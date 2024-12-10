import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { registerUser } from "../api/auth"; // API çağrısını buradan yapıyoruz

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
      //navigation.navigate("Login"); // Başarılı kayıt sonrası Login ekranına yönlendirme
    } catch (error) {
      Alert.alert("Hata", error); // Hata mesajını göster
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
      <Button title="Kayıt Ol" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
