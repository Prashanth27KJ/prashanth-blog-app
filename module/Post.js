const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    photo: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
