const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "general",
    required: true,
  },

  primaryKey: {
    type: Number,
    required: true,
  },

  products: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = Video = mongoose.model("Video", VideoSchema);
