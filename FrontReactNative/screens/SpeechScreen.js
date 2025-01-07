import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Switch, Button } from "react-native-paper";
import * as Speech from "expo-speech"; // Sesli okuma için expo-speech
import { getQuestions, validateAnswer } from "../api/patient";
import globalStyles from "../styles/globalStyles";
const SpeechScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true); // Ses açık/kapalı kontrolü
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    // Soruları çekme işlemi
    const fetchQuestions = async () => {
      try {
        const result = await getQuestions();
        setQuestions(result.questions);
      } catch (error) {
        console.error("Sorular çekilirken hata oluştu:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // Mevcut soru değiştiğinde sesli okuma yapılır
    if (isSpeechEnabled && questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      Speech.speak(currentQuestion.question);
    }
  }, [currentQuestionIndex, isSpeechEnabled, questions]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) {
      Alert.alert("Hata", "Lütfen bir cevap seçiniz!");
      return;
    }

    try {
      const payload = {
        question_id: questions[currentQuestionIndex].id,
        answer: selectedAnswer,
      };
      const result = await validateAnswer(payload);
      Alert.alert("Sonuç", result.message);

      // Bir sonraki soruya geçiş
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(""); // Seçilen cevabı sıfırla
      } else {
        Alert.alert("Bitti", "Tüm soruları tamamladınız!");
      }
    } catch (error) {
      console.error("Cevap doğrulama sırasında hata oluştu:", error);
    }
  };

  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={globalStyles.container}>
      {currentQuestion && (
        <>
          <Text style={globalStyles.title}>{currentQuestion.question}</Text>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                mode="contained"
                onPress={() => handleAnswerSelection(option)}
                style={{
                  backgroundColor:
                    selectedAnswer === option ? "#4CAF50" : "#E5E1DA",
                  marginVertical: 5, // Butonlar arasında biraz boşluk bırakmak için
                }}
                labelStyle={{
                  color: "#FFFFFF", // Yazı rengini beyaz yapmak için
                }}
              >
                {option}
              </Button>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={handleSubmitAnswer}
            style={{ backgroundColor: "#E5E1DA" }}
            labelStyle={{
              color: "#FFFFFF", // Yazı rengini beyaz yapmak için
            }}
          >
            Cevabı Gönder
          </Button>
        </>
      )}
      <View style={styles.switchContainer}>
        <Text>Sesli Okuma</Text>
        <Switch
          value={isSpeechEnabled}
          onValueChange={toggleSpeech}
          color={"#E5E1DA"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  questionText: { fontSize: 18, fontWeight: "bold", marginVertical: 20 },
  optionsContainer: { marginVertical: 20 },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SpeechScreen;
