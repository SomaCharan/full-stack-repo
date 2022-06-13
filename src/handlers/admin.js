const Router = require("express").Router();
const { body } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const User = require("../models/User");
const WithdrawalRequest = require("../models/WithdrawalRequest");
const Bank = require("../models/BankInformation");
const rejectBadRequests = require("../services/validationService");

const userPostBodyValidators = [
  body("name").notEmpty().withMessage("name field is required"),
  body("username").notEmpty().withMessage("username field is required"),
  body("phone").notEmpty().withMessage("phone field is required"),
  body("email").notEmpty().withMessage("email field is required"),
  body("password").notEmpty().withMessage("password field is required"),
];

const withdrawalRequestPostBodyValidators = [
  body("amount")
    .notEmpty()
    .withMessage("amount field is required")
    .isString()
    .withMessage("amount must be a string."),
  body("userreference")
    .notEmpty()
    .withMessage("userreference field is required")
    .isString()
    .withMessage("userreference must be a string."),
];


/**
 * get a list of users
 */
Router.get("/users", auth, async (req, res) => {

  let query;
  if (req.query.withdrawalRequest === "true") {
    query = User.find({ withdrawalRequest: true }).select("-password")
  } else {
    query = User.find().select("-password")
  }

  const admin = await User.findById(req.user.id);

  if (admin.userType !== "0") {
    return res
      .status(401)
      .send({ msg: "You are not authorized to make this action." });
  }

  try {
    const users = await query;
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * User Delete APi
 */
Router.delete("/user/:userId", auth, async (req, res) => {
  const admin = await User.findById(req.user.id);

  if (admin.userType !== "0") {
    return res
      .status(401)
      .send({ msg: "You are not authorized to make this action." });
  }

  try {
    const user = await User.find({ userreference: req.params.userId });

    if (!user) {
      return res.status(404).send({ msg: "no user found with this user ID" });
    }

    await User.findOneAndDelete({ userreference: req.params.userId })
      .then(() => {
        return res.status(200).send("User deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send(err);
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});


/**
 * create a user by admin
 */
Router.post(
  "/user",
  auth,
  userPostBodyValidators,
  rejectBadRequests,
  async (req, res) => {
    const { email, phone, password } = req.body;
    const userreference = uuidv4();

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(409).json({
          error: [{ msg: "User already Exists with this email address" }],
        });
        return;
      }

      user = await User.findOne({ phone });

      if (user) {
        res.status(409).json({
          error: [{ msg: "User already Exists with this phone number" }],
        });
        return;
      }

      user = new User({
        ...req.body,
        userreference: userreference,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save().catch((err) => {
        console.log(err); -
          res
            .status(400)
            .send(
              "some error occured while creating user, Please contact developer"
            );
        return;
      });

      return res.status(201).send("User Registered Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
      return;
    }
  }
);

/**
 * get user income
 */
Router.get("/users/income", auth ,async (req, res) => {

  const admin = await User.findById(req.user.id);

  if (admin.userType !== "0") {
    return res
      .status(401)
      .send({ msg: "You are not authorized to make this action." });
  }

  const tempArray = [];

  try {
    const users = await User.find().select("userreference email name");

    for (let j = 0; j < users.length; j++) {
      const activeUsers = await User.find({
        introducerreference: users[j].userreference,
      });

      var passiveUsers = [];

      for (let i = 0; i < activeUsers.length; i++) {
        let tempUsers = await User.find({
          introducerreference: activeUsers[i].userreference,
        });
        passiveUsers = passiveUsers.concat(tempUsers);
      }

      const activeUsersVar = activeUsers.map((person) => ({
        commission: person?.products?.includes("2") ? "1600" : "3000",
      }));

      activeIncomeVarVar = activeUsersVar.reduce(
        (previousValue, currentValue) => previousValue + parseInt(currentValue.commission, 10),
        0
      );

      const passiveUsersVar = passiveUsers.map((person) => ({
        commission: person?.products?.includes("2") ? "150" : "500",
      }));

      passiveIncomeVarVar = passiveUsersVar.reduce(
        (previousValue, currentValue) => previousValue + parseInt(currentValue.commission, 10),
        0
      );


      tempArray.push({ user: users[j], totalIncome: passiveIncomeVarVar + activeIncomeVarVar })
    }

    return res
      .status(200)
      .send(tempArray);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * get user income
 */
Router.get("/user/:userId/all-details", auth, async (req, res) => {

  const admin = await User.findById(req.user.id);

  if (admin.userType !== "0") {
    return res
      .status(401)
      .send({ msg: "You are not authorized to make this action." });
  }

  try {
    const user = await User.findOne({ userreference: req.params.userId }).select("-password");

    if (!user) {
      return res.status(404).send({ msg: "no user found with this user ID" });
    }

    const bank = await Bank.findOne({ userreference: req.params.userId });
    const withdrawalRequests = await WithdrawalRequest.find({ userreference: req.params.userId });

    const activeUsers = await User.find({
      introducerreference: user.userreference,
    });

    var passiveUsers = [];

    for (let i = 0; i < activeUsers.length; i++) {
      let tempUsers = await User.find({
        introducerreference: activeUsers[i].userreference,
      });
      passiveUsers = passiveUsers.concat(tempUsers);
    }

    const activeUsersVar = activeUsers.map((person) => ({
      ...person._doc,
      commission: person?.products?.includes("2") ? "1600" : "3000",
    }));

    const passiveUsersVar = passiveUsers.map((person) => ({
      ...person._doc,
      commission: person?.products?.includes("2") ? "150" : "500",
    }));

    return res
      .status(200)
      .send({ activeUsers: activeUsersVar, passiveUsers: passiveUsersVar, user: user, bank, withdrawalRequests });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * User update api
 */
Router.patch("/user/:userId", auth, async (req, res) => {
  const admin = await User.findById(req.user.id);

  if (admin.userType !== "0") {
    return res
      .status(401)
      .send({ msg: "You are not authorized to make this action." });
  }

  try {
    const user = await User.find({ userreference: req.params.userId });

    if (!user) {
      return res.status(404).send({ msg: "no user found with this user ID" });
    }

    await User.findOneAndUpdate({ userreference: req.params.userId }, req.body)
      .then(() => {
        return res.status(200).send("User details updated successfully");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
        return;
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
* create withdrawal request for a user
*/
Router.post(
  "/withdrawal-request",
  auth,
  withdrawalRequestPostBodyValidators,
  rejectBadRequests,
  async (req, res) => {
    const admin = await User.findById(req.user.id);

    if (admin.userType !== "0") {
      return res
        .status(401)
        .send({ msg: "You are not authorized to make this action." });
    }

    try {
      withdrawalRequest = new WithdrawalRequest(req.body);

      await withdrawalRequest.save().catch((err) => {
        console.log(err);
        return res
          .status(400)
          .send("some error occured while saving withdrawal Request, Please contact admin");
      });

      // mark user, that it doesnt require withdrawal request anymore
      const updateUserfield = {
        withdrawalRequest: false
      }

      await User.findOneAndUpdate({ userreference: req.body.userreference }, updateUserfield)
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
          return;
        });

      return res.status(200).send("Withdrawal Request Saved Successfully.");
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("Some error occurred while saving Withdrawal Request, Please Contact Admin");
      return;
    }
  }
);

module.exports = Router;
