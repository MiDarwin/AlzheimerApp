import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.0.2.2:8000"; // Backend URL'si

axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Token'i header'a ekle
  }
  return config;
});

// Hasta kayıt fonksiyonu
export const registerPatient = async (patientData) => {
  try {
    const response = await axios.post(`${BASE_URL}/patients`, patientData);
    return response.data; // Backend'den dönen yanıtı döndür
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Hasta kaydı sırasında bir hata oluştu.";
    throw errorMessage; // Hata durumunda hata mesajını fırlat
  }
};
// Soruları çekmek için GET isteği
export const getQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/questions`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

// Cevap doğrulama için POST isteği
export const validateAnswer = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/validate-answer`, payload); // BASE_URL eklendi
    return response.data;
  } catch (error) {
    console.error("Cevap doğrulama sırasında hata oluştu:", error);
    throw error;
  }
};
// Hasta bilgilerini al
export const getPatientInfo = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/patients`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Hasta bilgileri alınırken hata oluştu.");
  }
};

// Hasta bilgilerini sil
export const deletePatient = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${BASE_URL}/patients`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error("Hasta silme işlemi sırasında hata oluştu.");
  }
};
