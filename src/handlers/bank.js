const Router = require("express").Router();
const { body } = require("express-validator");
const rejectBadRequests = require("../services/validationService");
const auth = require("../middleware/auth");
const Bank = require("../models/BankInformation");
const User = require("../models/User");

const bankPostBodyValidators = [
    body("accName")
        .notEmpty()
        .withMessage("Account Name field is required")
        .isString()
        .withMessage("Account Name be a string."),
    body("accNumber")
        .notEmpty()
        .withMessage("Account Number is required")
        .isString()
        .withMessage("Account Number must be a string."),
    body("ifscCode")
        .notEmpty()
        .withMessage("IFSC Code field is required")
        .isString()
        .withMessage("IFSC Code must be a string."),

];

/**
 * create bank information for user
 */
Router.post(
    "/",
    auth,
    bankPostBodyValidators,
    rejectBadRequests,
    async (req, res) => {

        const user = await User.findById(req.user.id);
        try {
            bankInformation = new Bank({ ...req.body, userreference: user.userreference });

            await bankInformation.save().catch((err) => {
                console.log(err);
                return res
                    .status(400)
                    .send("some error occured while saving Bank Information, Please contact admin");
            });


            return res.status(200).send("Bank Information Saved Successfully.");
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .send("Some error occurred while saving bank Information, Please Contact Admin");
            return;
        }
    }
);


/**
 * get a list of videos
 */
Router.get("/", auth, async (req, res) => {

    const user = await User.findById(req.user.id).select('userreference');

    try {
        bankDetails = await Bank.findOne({ userreference: user.userreference })
        return res.status(200).json(bankDetails);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

module.exports = Router;