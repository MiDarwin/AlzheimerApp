import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { registerUser } from "../api/auth"; // API çağrısını import ediyoruz

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await registerUser({ name, email, password });
      Alert.alert("Başarılı", "Kayıt işlemi başarılı!");
      navigation.navigate("Login"); // Kayıt sonrası Login ekranına yönlendirme
    } catch (error) {
      Alert.alert("Hata", error.message || "Kayıt işlemi başarısız.");
    }
  };

  return (
    <View>
      <TextInput placeholder="İsim" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Kayıt Ol" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
