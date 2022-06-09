const Router = require("express").Router();
const auth = require("../middleware/auth");
const WithdrawalRequest = require("../models/WithdrawalRequest");
const User = require("../models/User");


/**
 * get a list of withdrawal request
 */
Router.get("/", auth, async (req, res) => {

    const user = await User.findById(req.user.id).select('userreference');

    try {
        withdrawalRequests = await WithdrawalRequest.find({ userreference: user.userreference })
        return res.status(200).json(withdrawalRequests);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

module.exports = Router;