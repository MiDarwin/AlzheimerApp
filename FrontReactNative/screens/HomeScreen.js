import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator, Alert } from "react-native";
import globalStyles from "../styles/globalStyles";
import { getUserInfo } from "../api/auth";

const HomeScreen = () => {
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

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>
        Hoşgeldiniz {user?.first_name} {user?.last_name}!
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
