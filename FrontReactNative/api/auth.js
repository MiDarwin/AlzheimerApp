import axios from "axios";

const BASE_URL = "http://localhost:8000"; // Backend API URL'si

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data; // Hataları yakalayarak frontend'e ilet
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data; // Token'i döndür
  } catch (error) {
    throw error.response.data;
  }
};
