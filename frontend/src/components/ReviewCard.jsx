import { reviewWord } from "../services/api";

const ReviewCard = ({
  word,
  refreshWords,
}) => {
  const handleReview = async (
    difficulty
  ) => {
    await reviewWord(
      word._id,
      difficulty
    );

    refreshWords();
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        marginTop: "20px",
        padding: "15px",
      }}
    >
      <h2>{word.word}</h2>

      <p>{word.definition}</p>

      <p>{word.example}</p>

      <button
        onClick={() =>
          handleReview("easy")
        }
      >
        Easy
      </button>

      <button
        onClick={() =>
          handleReview("medium")
        }
      >
        Medium
      </button>

      <button
        onClick={() =>
          handleReview("hard")
        }
      >
        Hard
      </button>
    </div>
  );
};

export default ReviewCard;