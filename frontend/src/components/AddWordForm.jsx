import { useState } from "react";
import { addWord } from "../services/api";

const AddWordForm = ({ refreshWords }) => {
  const [word, setWord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!word) return;

    await addWord(word);

    setWord("");

    refreshWords();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />

      <button type="submit">
        Add Word
      </button>
    </form>
  );
};

export default AddWordForm;