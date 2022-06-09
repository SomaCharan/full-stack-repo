const mongoose = require("mongoose");

const WithdrawalRequest = new mongoose.Schema({

    userreference: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        required: false,
        default: 'success'
    },

    dateOfTransaction: {
        type: String,
        required: false,
        default: ''
    },

    createdAt: { type: Date, default: Date.now },
});

module.exports = Video = mongoose.model("WithdrawalRequest", WithdrawalRequest);
