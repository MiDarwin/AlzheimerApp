import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator, Alert } from "react-native";
import { Button, FAB } from "react-native-paper";
import globalStyles from "../styles/globalStyles";
import { getUserInfo } from "../api/auth";
import SettingsScreen from "./SettingsScreen";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null); // Kullanıcı bilgileri
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo(); // API'den kullanıcı bilgilerini al
        setUser(userInfo); // Kullanıcı bilgilerini state'e kaydet
      } catch (error) {
        Alert.alert("Hata", error.toString());
      } finally {
        setLoading(false); // Yüklenme durumu sona erdi
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    // Bilgiler yüklenirken yüklenme spinner'ı göster
    return (
      <SafeAreaView style={globalStyles.activityContainer}>
        <ActivityIndicator
          size="large"
          color="#E5E1DA"
          style={{ justifyContent: "center", alignItems: "center" }}
        />
      </SafeAreaView>
    );
  }
  const PatientRegisterScreen = async () => {
    navigation.navigate("PatientRegisterScreen");
  };
  const SpeechScreen = async () => {
    navigation.navigate("SpeechScreen"); // Başarılı giriş sonrası ana sayfaya yönlendir
  };
  const SettingsScreen = async () => {
    navigation.navigate("SettingsScreen");
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>
        Hoşgeldiniz {user?.first_name} {user?.last_name}!
      </Text>
      <Button
        mode="contained"
        onPress={PatientRegisterScreen}
        style={globalStyles.button}
      >
        Hasta Kayıt
      </Button>
      <Button
        mode="contained"
        onPress={SpeechScreen}
        style={globalStyles.button}
      >
        Sesli Cevap!
      </Button>
      <FAB
        icon="settings-helper"
        style={globalStyles.fab}
        onPress={SettingsScreen}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
