const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var multer = require("multer");
const { body } = require("express-validator");
const User = require("../models/User");
const Order = require("../models/Order");
const rejectBadRequests = require("../services/validationService");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middleware/auth");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtqrvcvp8",
  api_key: "137487476221951",
  api_secret: "uSHY3PvYKXbMfoYnw0AN0wGFYV8",
});

// TODO include payment details as well
const userPostBodyValidators = [
  body("name").notEmpty().withMessage("name field is required"),
  body("username").notEmpty().withMessage("username field is required"),
  body("phone").notEmpty().withMessage("phone field is required"),
  body("email").notEmpty().withMessage("email field is required"),
  body("password").notEmpty().withMessage("password field is required"),
];

var upload = multer({ dest: "public/uploads/" });

/**
 * create a user
 */
Router.post(
  "/",
  userPostBodyValidators,
  rejectBadRequests,
  async (req, res) => {
    const { paymentData, confirmPassword, ...userDetails } = req.body;

    const userreference = uuidv4();

    const { email, phone, password } = userDetails;

    const productId = paymentData.product;

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
        ...userDetails,
        userreference: userreference,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save().catch((err) => {
        console.log(err);
        res
          .status(400)
          .send(
            "some error occured while creating user, Please contact admin if money has been deducted"
          );
        return;
      });

      await User.findByIdAndUpdate(user.id, {
        $push: { products: productId },
      }).catch((err) => {
        console.log(err);
        res
          .status(400)
          .send(
            "User registered successfully, but failed to update some attributes, Please contact admin."
          );
        return;
      });

      order = new Order({
        ...paymentData,
        userreference: userreference,
        user: user.id,
      });

      await order.save().catch((err) => {
        console.log(err);
        res
          .status(400)
          .send(
            "User registered successfully, but failed to update referer, Please contact admin."
          );
        return;
      });

      if (
        userDetails.introducerreference !== undefined &&
        userDetails.introducerreference !== "" &&
        userDetails.introducerreference !== null
      ) {
        await User.findOneAndUpdate(
          { userreference: userDetails.introducerreference },
          { $push: { downlineUsers: user.id } }
        ).catch((err) => {
          console.log(err);
          res
            .status(400)
            .send(
              "User registered successfully, but failed to update referer, Please contact admin. You can login from the login page"
            );
          return;
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const userData = {
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        userreference: user.userreference,
        activeIncome: user.activeIncome,
        passiveIncome: user.passiveIncome,
        students: user.students,
        sevenDaysIncome: user.sevenDaysIncome,
        todayIncome: user.todayIncome,
        thirtyDaysIncome: user.thirtyDaysIncome,
        products: user.products,
      };

      jwt.sign(
        payload,
        "thisISMySecret",
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, userData });
        }
      );

      return;
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("Some error occurred while creating user. Contact Admin");
      return;
    }
  }
);

/**
 * User update api
 */
Router.patch("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({ msg: "no user found with this user ID" });
    }
    await User.findByIdAndUpdate(req.user.id, req.body)
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

// TODO change to patch
/**
 * User image update api
 */
Router.post(
  "/image/:userId",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      image = await cloudinary.uploader.upload(req?.file?.path);
    } catch (error) {
      console.log(error);
    }

    var data = { profile_image: image?.secure_url };

    try {
      const user = await User.find({ userreference: req.params.userId });

      if (!user) {
        return res.status(404).send({ msg: "no user found with this user ID" });
      }

      await User.findOneAndUpdate({ userreference: req.params.userId }, data)
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
  }
);

/**
 * get user income
 */
Router.get("/income", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).send({ msg: "no user found with this user ID" });
    }

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
      .send({ activeUsers: activeUsersVar, passiveUsers: passiveUsersVar });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = Router;
