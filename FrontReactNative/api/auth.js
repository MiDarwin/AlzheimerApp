import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`; // Token'i header'a ekle
  }
  return config;
});
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data.token; // Backend'den dönen token'i geri döndür
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Giriş işlemi sırasında bir hata oluştu!";
    throw errorMessage;
  }
};
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user-info`);
    return response.data; // Kullanıcı bilgilerini döndür
  } catch (error) {
    throw (
      error.response?.data?.detail || // Backend'den gelen detail kullan
      "Kullanıcı bilgileri alınırken bir hata oluştu."
    );
  }
};
