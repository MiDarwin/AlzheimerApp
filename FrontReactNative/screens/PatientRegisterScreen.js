import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Divider,
  RadioButton,
} from "react-native-paper";
import globalStyles from "../styles/globalStyles";

const PatientRegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [childCount, setChildCount] = useState("0");
  const [childrenNames, setChildrenNames] = useState([]);
  const [district, setDistrict] = useState("");

  const handleChildCountChange = (value) => {
    setChildCount(value);
    const count = parseInt(value, 10);
    const updatedChildren = Array(count).fill("");
    setChildrenNames(updatedChildren);
  };

  const handleChildNameChange = (index, name) => {
    const updatedChildren = [...childrenNames];
    updatedChildren[index] = name;
    setChildrenNames(updatedChildren);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text variant="headlineMedium" style={styles.header}>
          Hasta Kaydı
        </Text>
        <TextInput
          label="İsim"
          value={firstName}
          onChangeText={setFirstName}
          style={globalStyles.textInput}
        />
        <TextInput
          label="Soyisim"
          value={lastName}
          onChangeText={setLastName}
          style={globalStyles.textInput}
        />

        <Text style={styles.subHeader}>Çocuk Sayısı:</Text>
        <RadioButton.Group
          onValueChange={(value) => handleChildCountChange(value)}
          value={childCount}
        >
          {[...Array(7)].map((_, index) => (
            <RadioButton.Item
              key={index}
              label={`${index}`}
              value={`${index}`}
            />
          ))}
        </RadioButton.Group>

        {childrenNames.map((_, index) => (
          <TextInput
            key={index}
            label={`Çocuk ${index + 1} Adı`}
            value={childrenNames[index]}
            onChangeText={(name) => handleChildNameChange(index, name)}
            style={styles.input}
          />
        ))}

        <TextInput
          label="İlçe"
          value={district}
          onChangeText={setDistrict}
          style={globalStyles.textInput}
        />

        <Button
          mode="contained-tonal"
          style={globalStyles.button}
          onPress={() => {}}
        >
          Kaydet
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    padding: 5,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default PatientRegisterScreen;
