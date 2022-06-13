const Router = require("express").Router();
const auth = require("../middleware/auth");
const { body } = require("express-validator");
const Notification = require("../models/Notification");
const User = require("../models/User");


const videoPostBodyValidators = [
    body("description")
        .notEmpty()
        .withMessage("Description field is required")
        .isString()
        .withMessage("Description must be a string."),
    body("title")
        .notEmpty()
        .withMessage("Title field is required")
        .isString()
        .withMessage("Title must be a string."),
];


/**
 * create a notification
 */
Router.post("/", auth, videoPostBodyValidators, async (req, res) => {
    const admin = await User.findById(req.user.id);
    if (admin.userType !== "0") {
        return res
            .status(401)
            .send({ msg: "You are not authorized to make this action." });
    }
    try {
        notification = new Notification(req.body);
        await notification.save().catch((err) => {
            console.log(err);
            return res
                .status(400)
                .send("some error occured while saving notification, Please contact admin");
        });
        return res.status(200).send("notification created Successfully");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

/**
 * get list of notifications
 */
Router.get("/", auth, async (req, res) => {

    try {
        const notifications = await Notification.find().sort('-createdAt');

        return res.status(200).send(notifications);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});


module.exports = Router;