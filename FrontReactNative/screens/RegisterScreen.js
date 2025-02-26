import React, { useState } from "react";
import { View, Alert, StyleSheet, Image } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { registerUser } from "../api/auth"; // API çağrısını buradan yapıyoruz
import globalStyles from "../styles/globalStyles";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await registerUser({
        first_name: firstName,
        last_name: lastName,
        email: mail,
        password: password,
      });

      Alert.alert("Başarılı", "Kayıt işlemi başarılı!");
      navigation.navigate("Login"); // Başarılı kayıt sonrası Login ekranına yönlendirme
    } catch (error) {
      Alert.alert("Hata", error); // Hata mesajını göster
    }
  };

  const login = async () => {
    navigation.navigate("Login");
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.content}>
        {/* Üst kısım: Form alanı */}
        <Text variant="displayMedium" style={globalStyles.title}>
          Hesap Aç
        </Text>
        <TextInput
          activeOutlineColor="red"
          placeholder="İsim"
          value={firstName}
          onChangeText={setFirstName}
          style={globalStyles.textInput}
        />
        <TextInput
          placeholder="Soyisim"
          value={lastName}
          onChangeText={setLastName}
          style={globalStyles.textInput}
        />
        <TextInput
          placeholder="Email"
          value={mail}
          onChangeText={setMail}
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
          style={globalStyles.button}
          onPress={handleRegister}
        >
          Kayıt Ol
        </Button>

        <Button mode="contained" onPress={login} style={globalStyles.button}>
          Login Ekranı
        </Button>
      </View>

      {/* Alt kısım: Logo */}
      <View style={globalStyles.footer}>
        <Image
          source={require("../assets/AlzheimerAppLogo.png")}
          style={globalStyles.logo}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
