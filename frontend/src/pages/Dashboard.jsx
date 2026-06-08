import { useState, useEffect } from "react";
import { FaBook, FaClock, FaCheckCircle } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

function Dashboard() {
  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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

      toast.error(error?.response?.data?.message || "Failed to add word");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Smart Vocabulary Builder 🚀
            </h1>

            <p className="text-indigo-100 text-sm">
              Learn smarter. Remember longer.
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/review")}
            className="bg-white text-indigo-600 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            Review Words
          </button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">
          <h2 className="text-4xl font-bold  text-white mb-3">
            Master New Words Every Day 📚
          </h2>

          <p className="text-lg text-indigo-100">
            Build your vocabulary with smart reviews, definitions and learning
            analytics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-3xl shadow-xl p-6 hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white text-lg font-medium">Total Words</h3>
                <p className="text-4xl font-bold text-white mt-2">
                  {words.length}
                </p>
              </div>

              <FaBook className="text-indigo-600 text-3xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-3xl shadow-xl p-6 hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white text-lg font-medium">Due Today</h3>
                <p className="text-4xl font-bold text-white mt-2">
                  {
                    words.filter(
                      (w) => new Date(w.nextReviewDate) <= new Date(),
                    ).length
                  }
                </p>
              </div>

              <FaClock className="text-orange-500 text-3xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl shadow-xl p-6 hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white text-lg font-medium">Review Count</h3>
                <p className="text-4xl font-bold text-white mt-2">
                  {words.length}
                </p>
              </div>

              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
          </div>
        </div>

       
       {/* Add Word */}
<div className="mt-8 bg-white rounded-3xl shadow-2xl p-8 border border-indigo-100">
  <h2 className="text-2xl font-bold mb-5">Add New Word ✨</h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      placeholder="🔍 Enter a new vocabulary word..."
      value={word}
      onChange={(e) => setWord(e.target.value)}
      className="w-full border-2 border-indigo-100 rounded-2xl p-4 outline-none focus:border-indigo-500"
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
    >
      {loading ? "Saving..." : "Save Word"}
    </button>
  </form>
</div>
        <div className="mt-8 bg-white rounded-3xl shadow-xl p-6">
          <input
            type="text"
            placeholder="🔍 Search vocabulary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Recent Words */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Words</h2>

          {words.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No words added yet.
            </div>
          ) : (
            <div className="space-y-4">
              {words
                .filter((item) =>
                  item.word?.toLowerCase().includes(search.toLowerCase()),
                )
                .slice(0, 10)
                .map((item) => (
                  <div
                    key={item._id}
                    className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl p-5 hover:shadow-xl transition duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg capitalize text-indigo-600">
                        {item.word}
                      </h3>

                      <span className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
                        Vocabulary
                      </span>
                    </div>

                    <p className="text-gray-700">{item.definition}</p>

                    <p className="text-sm italic text-gray-500 mt-2">
                      {item.example}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 bg-white rounded-3xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Learning Progress</h3>

          <span className="font-bold text-indigo-600">
            {words.length} Words
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-4 rounded-full"
            style={{
              width: `${Math.min(words.length * 10, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
