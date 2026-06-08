import { useState, useEffect } from "react";
import { FaBook, FaClock, FaCheckCircle } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";

function Dashboard() {
  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const res = await API.get("/");
      setWords(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch words");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!word.trim()) {
      toast.error("Please enter a word");
      return;
    }

    try {
      setLoading(true);

      await API.post("/", {
        word,
      });

      setWord("");

      await fetchWords();

      toast.success("Word Added Successfully");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to add word"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">
            Smart Vocabulary Builder
          </h1>

<button
  onClick={() =>
    (window.location.href = "/review")
  }
  className="bg-orange-500 text-white px-4 py-2 rounded-lg"
>
  Review Words
</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500">
                  Total Words
                </h3>
                <p className="text-4xl font-bold text-indigo-600 mt-2">
                  {words.length}
                </p>
              </div>

              <FaBook className="text-indigo-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500">
                  Due Today
                </h3>
                <p className="text-4xl font-bold text-orange-500 mt-2">
  {words.filter(
    (w) => new Date(w.nextReviewDate) <= new Date()
  ).length}
</p>
              </div>

              <FaClock className="text-orange-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500">
                  Review Count
                </h3>
                <p className="text-4xl font-bold text-green-500 mt-2">
                  {words.length}
                </p>
              </div>

              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
          </div>
        </div>

        {/* Add Word */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Add New Word
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Enter a word"
              value={word}
              onChange={(e) =>
                setWord(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              {loading
                ? "Saving..."
                : "Save Word"}
            </button>
          </form>
        </div>

        {/* Recent Words */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Recent Words
          </h2>

          {words.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No words added yet.
            </div>
          ) : (
            <div className="space-y-4">
              {words.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg capitalize text-indigo-600">
                      {item.word}
                    </h3>

                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                      Vocabulary
                    </span>
                  </div>

                  <p className="text-gray-700">
                    {item.definition}
                  </p>

                  <p className="text-sm italic text-gray-500 mt-2">
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default  Dashboard;