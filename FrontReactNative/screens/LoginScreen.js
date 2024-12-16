import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../api/auth"; // auth.js içindeki login fonksiyonunu çağırıyoruz

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
      await AsyncStorage.setItem("token", token); // Token'i kaydet
      Alert.alert("Başarılı", "Giriş işlemi başarılı!");
      navigation.navigate("Home"); // Başarılı giriş sonrası ana sayfaya yönlendir
    } catch (error) {
      Alert.alert("Hata", error); // Backend'den gelen hata mesajını göster
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
