import axios from "axios";

export const client = axios.create({
    baseURL: "https://purchasing-v1.onrender.com" 
  });