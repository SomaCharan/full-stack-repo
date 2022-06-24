const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    Unique: true,
  },
  phone: {
    type: Number,
    required: true,
    Unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 0 for admin, 1 for affiliate , 2 for user
  userType: {
    type: String,
    default: "2",
  },
  profile_image: {
    type: String,
  },
  userreference: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  introducerreference: {
    type: String,
    default: ''
  },
  //   always dummy data
  activeIncome: {
    type: Number,
    default: 0,
  },
  //   always dummy data
  passiveIncome: {
    type: Number,
    default: 0,
  },
  //   always dummy data
  sevenDaysIncome: {
    type: Number,
    default: 0,
  },
  //   always dummy data
  todayIncome: {
    type: Number,
    default: 0,
  },
  //   always dummy data
  thirtyDaysIncome: {
    type: Number,
    default: 0,
  },
  //   always dummy data
  LeaderBoardIncome: {
    type: Number,
    default: 0,
  },
  //   always dummy data
  students: {
    type: Number,
    default: 0,
  },
  starredUser: {
    type: Boolean,
    default: false,
  },

  downlineUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },

  withdrawalRequest: {
    type: Boolean,
    default: false,
  },

  products: [{ type: String }],

  // By default true, because there are users registered before we introduced this flag
  isActive: {
    type: Boolean,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model("User", UserSchema);
