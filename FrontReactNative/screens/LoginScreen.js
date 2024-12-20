import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../api/auth"; // auth.js içindeki login fonksiyonunu çağırıyoruz
import globalStyles from "../styles/globalStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Token'i kontrol eden fonksiyon
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("Home"); // Token varsa direkt Home sayfasına geç
    }
  };

  useEffect(() => {
    checkToken(); // Sayfa yüklendiğinde token'i kontrol et
  }, []);
  const handleLogin = async () => {
    try {
      const token = await loginUser({ email, password }); // loginUser auth.js'de tanımlı
      if (!token) {
        throw new Error("Token alınamadı. Lütfen tekrar giriş yapın.");
      }
      await AsyncStorage.setItem("token", token); // Token'i kaydet
      Alert.alert("Başarılı", "Giriş işlemi başarılı!");
      navigation.navigate("Home"); // Başarılı giriş sonrası ana sayfaya yönlendir
    } catch (error) {
      Alert.alert("Hata", error); // Backend'den gelen hata mesajını göster
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={globalStyles.textInput}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={globalStyles.textInput}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={globalStyles.button}
      >
        Giriş Yap
      </Button>
    </View>
  );
};

export default LoginScreen;
