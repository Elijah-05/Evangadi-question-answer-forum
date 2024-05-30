import axios from "axios";

export const userInstance = axios.create({
  baseURL: "http://localhost:4000/api/users",
  timeout: 1000 * 10,
  // headers:
});

export const questionInstance = axios.create({
  baseURL: "http://localhost:4000/api/question",
  timeout: 1000 * 10,
});

export const answerInstance = axios.create({
  baseURL: "http://localhost:4000/api/answer",
  timeout: 1000 * 10,
});
