import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Divider,
  RadioButton,
  SegmentedButtons,
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
      <ScrollView contentContainerStyle={globalStyles.innerContainer}>
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
        <SegmentedButtons
          style={globalStyles.SegmentedButtons}
          value={childCount}
          density="high"
          onValueChange={(value) => handleChildCountChange(value)}
          buttons={[
            {
              label: "0",
              value: "0",
              style: {
                backgroundColor: childCount === "0" ? "#E5E1DA" : "#B3C8CF",
              },
            },
            {
              label: "1",
              value: "1",
              style: {
                backgroundColor: childCount === "1" ? "#E5E1DA" : "#B3C8CF",
              },
            },
            {
              label: "2",
              value: "2",
              style: {
                backgroundColor: childCount === "2" ? "#E5E1DA" : "#B3C8CF",
              },
            },
            {
              label: "3",
              value: "3",
              style: {
                backgroundColor: childCount === "3" ? "#E5E1DA" : "#B3C8CF",
              },
            },
          ]}
        />

        {childrenNames.map((_, index) => (
          <TextInput
            key={index}
            label={`Çocuk ${index + 1} Adı`}
            value={childrenNames[index]}
            onChangeText={(name) => handleChildNameChange(index, name)}
            style={globalStyles.textInput}
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

  header: {
    textAlign: "center",
    marginBottom: 5,
  },

  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default PatientRegisterScreen;
