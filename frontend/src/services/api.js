import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/words",
});

export const addWord = (word) =>
  API.post("/", { word });

export const getReviewWords = () =>
  API.get("/review");

export const reviewWord = (id, difficulty) =>
  API.put(`/${id}/review`, {
    difficulty,
  });