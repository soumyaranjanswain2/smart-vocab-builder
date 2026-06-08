const Word = require("../models/Word");
const fetchWordData = require("../services/dictionaryService");

// Add New Word
const addWord = async (req, res) => {
  try {
    if (!req.body || !req.body.word) {
      return res.status(400).json({
        message: "Word is required",
      });
    }

    const { word } = req.body;

    const existingWord = await Word.findOne({
  word: word.toLowerCase(),
});

if (existingWord) {
  return res.status(400).json({
    message: "Word already exists",
  });
}

    console.log("Received word:", word);

    const data = await fetchWordData(word);

    const newWord = await Word.create({
      word,
      definition: data.definition,
      example: data.example,
    });

    res.status(201).json(newWord);
  } catch (error) {
    console.error("ERROR:", error);

    res.status(400).json({
      message: error.message || "Word not found",
    });
  }
};

// Get All Words
const getAllWords = async (req, res) => {
  try {
    const words = await Word.find().sort({
      createdAt: -1,
    });

    res.status(200).json(words);
  } catch (error) {
    console.error("Get Words Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Words For Review
const getWordsForReview = async (req, res) => {
  try {
    const words = await Word.find({
      nextReviewDate: { $lte: new Date() },
    });

    res.status(200).json(words);
  } catch (error) {
    console.error("Review Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Review Word (Easy / Medium / Hard)
const reviewWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { difficulty } = req.body;

    let days = 1;

    switch (difficulty) {
      case "easy":
        days = 7;
        break;

      case "medium":
        days = 3;
        break;

      case "hard":
        days = 1;
        break;

      default:
        days = 1;
    }

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + days);

    const updatedWord = await Word.findByIdAndUpdate(
      id,
      { nextReviewDate },
      { new: true }
    );

    res.status(200).json(updatedWord);
  } catch (error) {
    console.error("Review Update Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addWord,
  getAllWords,
  getWordsForReview,
  reviewWord,
};