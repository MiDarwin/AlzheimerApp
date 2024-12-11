import axios from "axios";

const BASE_URL = "http://10.0.2.2:8000"; // Backend API URL'sini yaz

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data; // API'nin döndürdüğü yanıtı geri döndür
  } catch (error) {
    // Backend'den gelen detaylı hata mesajını kullan
    const errorMessage =
      error.response?.data?.detail || "Kayıt işlemi sırasında bir hata oluştu!";
    throw errorMessage;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    return response.data; // Giriş işlemi yanıtını döndür
  } catch (error) {
    throw (
      error.response?.data?.message || "Giriş işlemi sırasında bir hata oluştu!"
    );
  }
};
