import { useEffect, useState } from "react";
import AddWordForm from "../components/AddWordForm";
import ReviewCard from "../components/ReviewCard";
import { getReviewWords } from "../services/api";
import "../App.css";

const Dashboard = () => {
  const [words, setWords] = useState([]);

  const fetchWords = async () => {
    try {
      const response = await getReviewWords();
      setWords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);
return (
  <div className="container">
    <h1 className="title">
      Smart Vocabulary Builder 🚀
    </h1>

    <AddWordForm refreshWords={fetchWords} />

    {words.map((word) => (
      <ReviewCard
        key={word._id}
        word={word}
        refreshWords={fetchWords}
      />
    ))}
  </div>
);
};

export default Dashboard;