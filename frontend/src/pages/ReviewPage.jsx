import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function ReviewPage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetchReviewWords();
  }, []);

  const fetchReviewWords = async () => {
    try {
      const res = await API.get("/review");
      setWords(res.data);
    } catch (error) {
      toast.error("Failed to fetch review words");
    }
  };

  const handleReview = async (id, difficulty) => {
    try {
      await API.put(`/${id}/review`, {
        difficulty,
      });

      toast.success(
        `Marked as ${difficulty}`
      );

      fetchReviewWords();
    } catch (error) {
      toast.error("Review failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Review Words
      </h1>

      <div className="space-y-4">
        {words.length === 0 ? (
          <p>No words due for review.</p>
        ) : (
          words.map((word) => (
            <div
              key={word._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-bold text-indigo-600">
                {word.word}
              </h2>

              <p className="mt-2">
                {word.definition}
              </p>

              <p className="text-gray-500 mt-2">
                {word.example}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    handleReview(
                      word._id,
                      "easy"
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Easy
                </button>

                <button
                  onClick={() =>
                    handleReview(
                      word._id,
                      "medium"
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Medium
                </button>

                <button
                  onClick={() =>
                    handleReview(
                      word._id,
                      "hard"
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Hard
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewPage;