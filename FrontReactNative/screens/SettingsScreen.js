import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"; // Exit ikonu için
import globalStyles from "../styles/globalStyles";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Token'ı AsyncStorage'dan sil
      Alert.alert("Başarılı", "Çıkış yaptınız.");
      navigation.replace("Login"); // Kullanıcıyı Login ekranına yönlendir
    } catch (error) {
      console.error("Çıkış işlemi sırasında hata oluştu:", error);
      Alert.alert("Hata", "Çıkış işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>Ayarlar</Text>
      <View style={styles.logoutContainer}>
        <MaterialIcons name="exit-to-app" size={24} color="red" />
        <Button title="Çıkış Yap" color="#d32f2f" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default SettingsScreen;
