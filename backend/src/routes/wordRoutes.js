const express = require("express");
const router = express.Router();
console.log("✅ Word Routes Loaded");
const {
  addWord,
  getWordsForReview,
  reviewWord,
} = require("../controllers/wordController");

// Add Word
router.post("/", addWord);

// Get Review Words
router.get("/review", getWordsForReview);

// Update Review Status
router.put("/:id/review", reviewWord);

module.exports = router;