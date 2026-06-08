const express = require("express");
const router = express.Router();

const {
  addWord,
  getAllWords,
  getWordsForReview,
  reviewWord,
} = require("../controllers/wordController");

// Add Word
router.post("/", addWord);

// Get All Words
router.get("/", getAllWords);

// Get Review Words
router.get("/review", getWordsForReview);

// Update Review Status
router.put("/:id/review", reviewWord);

module.exports = router;