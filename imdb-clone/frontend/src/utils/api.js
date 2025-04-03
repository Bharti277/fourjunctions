import axios from "axios";

const baseURL = "http://localhost:5000/api";

export const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    authorization: `Bearer`,
  },
});
