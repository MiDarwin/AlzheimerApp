import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const BASE_URL = "http://10.0.2.2:8000"; // Backend API URL'sini yaz

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        first_name: "Emirhaan",
        last_name: "Yılmaz",
        age: 22,
        gender: "Male",
        patient_number: 123,
        password: "my_secure_password",
      });

      Alert.alert("Başarılı", "Kayıt işlemi başarılı!");
      navigation.navigate("Login"); // Başarılı kayıt sonrası Login ekranına yönlendirme
    } catch (error) {
      console.error(error); // Hata detaylarını console'a yaz
      Alert.alert(
        "Hata",
        error.response?.data?.message || "Kayıt işlemi başarısız!"
      );
    }
  };

  return (
    <View>
      <TextInput
        placeholder="İsim"
        value={firstName}
        onChangeText={setFirstName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Soyisim"
        value={lastName}
        onChangeText={setLastName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Kayıt Ol" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
