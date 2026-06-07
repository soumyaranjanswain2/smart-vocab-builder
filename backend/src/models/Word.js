const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "test-user",
    },
    word: {
      type: String,
      required: true,
    },
    definition: String,
    example: String,
    nextReviewDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Word", wordSchema);