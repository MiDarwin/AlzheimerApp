import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import * as Speech from "expo-speech"; // Expo Speech kütüphanesi
import { getQuestions, validateAnswer } from "../api/patient";

const SpeechScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [response, setResponse] = useState(""); // Kullanıcı cevabı

  useEffect(() => {
    // Soruları çekme işlemi
    const fetchQuestions = async () => {
      try {
        const result = await getQuestions();
        setQuestions(result.questions);
        setCurrentQuestion(result.questions[0]); // İlk soruyu seç
      } catch (error) {
        console.error("Sorular çekilirken hata oluştu:", error);
        Alert.alert("Hata", "Sorular alınırken bir sorun oluştu.");
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionRead = () => {
    if (currentQuestion) {
      Speech.speak(currentQuestion.question, {
        language: "tr-TR",
      }); // Soruyu sesli oku
    } else {
      Alert.alert("Hata", "Okunacak bir soru bulunamadı.");
    }
  };

  const handleSubmitAnswer = async () => {
    try {
      if (!response) {
        Alert.alert("Hata", "Lütfen bir cevap girin.");
        return;
      }

      const payload = {
        question_id: currentQuestion.id,
        answer: response,
      };
      const result = await validateAnswer(payload);
      Alert.alert("Sonuç", result.message); // Doğrulama sonucunu göster

      // Sonraki soruya geç
      const currentIndex = questions.findIndex(
        (q) => q.id === currentQuestion.id
      );
      const nextQuestion = questions[currentIndex + 1];

      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setResponse(""); // Cevap alanını sıfırla
      } else {
        Alert.alert("Tebrikler", "Tüm soruları tamamladınız.");
      }
    } catch (error) {
      console.error("Cevap doğrulama sırasında hata oluştu:", error);
      Alert.alert("Hata", "Cevap doğrulama sırasında bir sorun oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      {currentQuestion && (
        <>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <Button title="Soruyu Oku" onPress={handleQuestionRead} />

          <TextInput
            style={styles.input}
            placeholder="Cevabınızı buraya yazın"
            value={response}
            onChangeText={setResponse}
          />

          <Button title="Cevabı Gönder" onPress={handleSubmitAnswer} />
        </>
      )}
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
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    marginVertical: 10,
  },
});

export default SpeechScreen;
