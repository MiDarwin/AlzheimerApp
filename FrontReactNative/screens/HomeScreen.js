import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import { getPatientInfo, deletePatient } from "../api/patient"; // API metodları
import globalStyles from "../styles/globalStyles";
import { getUserInfo } from "../api/auth"; // Kullanıcı bilgisi için API

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null); // Kullanıcı bilgileri
  const [patient, setPatient] = useState(null); // Hasta bilgileri
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const patientInfo = await getPatientInfo(); // Hasta bilgilerini çek
        setPatient(patientInfo);
      } catch (error) {
        console.log("Hasta bilgileri alınamadı:", error.message);
      } finally {
        setLoading(false); // Yüklenme durumu sona erdi
      }
    };

    fetchPatientInfo();
  }, []);

  const handleDeletePatient = async () => {
    try {
      await deletePatient(); // Hasta silme API'sini çağır
      setPatient(null); // Hasta bilgisini sıfırla
      Alert.alert("Başarılı", "Hasta başarıyla silindi.");
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo(); // Kullanıcı bilgilerini API'den al
        setUser(userInfo); // Gelen bilgiyi state'e ata
      } catch (error) {
        console.error(
          "Kullanıcı bilgileri alınırken hata oluştu:",
          error.message
        );
      }
    };

    fetchUserInfo();
  }, []);
  const startReminderExercise = () => {
    navigation.navigate("SpeechScreen"); // Sesli soru-cevap ekranına yönlendir
  };

  if (loading) {
    // Yüklenme durumunda spinner göster
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Kullanıcı bilgileri */}
      <Text style={globalStyles.title}>
        Hoşgeldiniz {user?.first_name} {user?.last_name}!
      </Text>

      {patient ? (
        // Hasta bilgileri varsa göster
        <>
          {/* Hatırlatma alıştırması butonu */}
          <Button
            mode="contained"
            onPress={startReminderExercise}
            style={[globalStyles.button, styles.reminderButton]}
          >
            Hatırlatma Alıştırmasını Başlat
          </Button>

          {/* Hasta bilgileri */}
          <View style={styles.patientContainer}>
            <Text style={styles.patientText}>
              {patient.first_name} {patient.last_name}
            </Text>
            <Text style={styles.patientText}>
              Çocuk Sayısı: {patient.child_count}
            </Text>
            <Text style={styles.patientText}>
              Çocuklar: {patient.children_names.join(", ")}
            </Text>
            <Text style={styles.patientText}>İlçe: {patient.district}</Text>

            {/* Hasta silme butonu */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeletePatient}
            >
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // Hasta bilgisi yoksa hasta kayıt butonu göster
        <Button
          mode="contained"
          onPress={() => navigation.navigate("PatientRegisterScreen")}
          style={globalStyles.button}
        >
          Hasta Kayıt
        </Button>
      )}
      {/* Footer kısmı (Logo) */}
      <View style={globalStyles.footer}>
        <Image
          source={require("../assets/AlzheimerAppLogo.png")}
          style={globalStyles.logo}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  reminderButton: {
    backgroundColor: "#4CAF50", // Yeşil renk
    marginBottom: 20, // Hasta bilgileriyle araya boşluk bırak
  },
  patientContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 20,
    width: "90%",
    alignItems: "center",
  },
  patientText: {
    fontSize: 16,
    marginVertical: 5,
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#d32f2f",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
