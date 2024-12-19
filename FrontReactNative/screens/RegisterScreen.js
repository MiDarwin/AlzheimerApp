import React, { useState } from "react";
import { View, Alert, SafeAreaView, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { registerUser } from "../api/auth"; // API çağrısını buradan yapıyoruz
import { SafeAreaProvide } from "react-native-safe-area-context";

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
    <View
      style={{
        padding: 20,
        flex: 1,
        marginBottom: 0,
        backgroundColor: "#B3C8CF",
      }}
    >
      <Text variant="displayMedium" style={{ marginTop: 1, marginLeft: 20 }}>
        Hesap Aç
      </Text>
      <TextInput
        activeOutlineColor="red"
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
        placeholder="Email"
        value={mail}
        onChangeText={setMail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button
        mode="contained"
        style={{ marginBottom: 10, backgroundColor: "#E5E1DA" }}
        gonPress={handleRegister}
      >
        Kayıt Ol
      </Button>

      <Button
        mode="contained"
        onPress={login}
        style={{ marginBottom: 10, backgroundColor: "#E5E1DA" }}
      >
        lOGİN Ekranı
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default RegisterScreen;
