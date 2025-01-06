import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Tts from "react-native-tts"; // Metin okuma için
import Voice from "@react-native-voice/voice"; // Sesli cevap alma için
import { getQuestions, validateAnswer } from "../api/patient";

const SpeechScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    // Soruları çekme işlemi
    const fetchQuestions = async () => {
      try {
        const result = await getQuestions();
        setQuestions(result.questions);
        setCurrentQuestion(result.questions[0]); // İlk soruyu seç
      } catch (error) {
        console.error("Sorular çekilirken hata oluştu:", error);
      }
    };

    fetchQuestions();

    // Ses tanıma eventlerini ayarla
    Voice.onSpeechResults = (event) => {
      if (event.value && event.value.length > 0) {
        setResponse(event.value[0]); // İlk tanınan cevabı al
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners); // Bileşen unmount olduğunda temizle
    };
  }, []);

  const handleQuestionRead = () => {
    if (currentQuestion) {
      Tts.speak(currentQuestion.question); // Soruyu sesli oku
    }
  };

  const handleVoiceInput = async () => {
    try {
      await Voice.start("tr-TR"); // Türkçe dilinde dinlemeye başla
    } catch (error) {
      console.error("Sesli cevap alma sırasında hata oluştu:", error);
    }
  };

  const handleSubmitAnswer = async () => {
    try {
      const payload = {
        question_id: currentQuestion.id,
        answer: response,
      };
      const result = await validateAnswer(payload);
      console.log("Cevap doğrulama sonucu:", result);
      alert(result.message); // Doğrulama sonucu ekrana göster
    } catch (error) {
      console.error("Cevap doğrulama sırasında hata oluştu:", error);
    }
  };
  const oku = async () => {
    try {
      Tts.speak("Merhaba, bu bir test mesajıdır!");
    } catch (error) {
      console.error("TTS sırasında hata oluştu:", error);
    }
  };

  return (
    <View style={styles.container}>
      {currentQuestion && (
        <>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <Button title="Soruyu Oku" onPress={handleQuestionRead} />
          <Button title="Cevap Ver" onPress={handleVoiceInput} />
          <Button title="Cevabı Gönder" onPress={handleSubmitAnswer} />
          <Button title="Oku" onPress={oku} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  questionText: { fontSize: 18, fontWeight: "bold", marginVertical: 20 },
});

export default SpeechScreen;
