const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({

    userreference: {
        type: String,
        required: true,
    },

    accName: {
        type: String,
        required: true,
    },

    accNumber: {
        type: Number,
        required: true,
    },

    ifscCode: {
        type: String,
        required: true,
    },

    createdAt: { type: Date, default: Date.now },
});

module.exports = Video = mongoose.model("Bank", BankSchema);
