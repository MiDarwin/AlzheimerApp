import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator, Alert } from "react-native";
import { Button } from "react-native-paper";
import globalStyles from "../styles/globalStyles";
import { getUserInfo } from "../api/auth";

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
      <SafeAreaView style={globalStyles.container}>
        <ActivityIndicator size="large" color="#6200ea" />
      </SafeAreaView>
    );
  }
  const PatientRegisterScreen = async () => {
    navigation.navigate("PatientRegisterScreen");
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
    </SafeAreaView>
  );
};

export default HomeScreen;
