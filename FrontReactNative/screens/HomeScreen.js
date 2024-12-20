import React from "react";
import { View, StyleSheet } from "react-native";
import globalStyles from "../styles/globalStyles";
import { Button, TextInput, Text } from "react-native-paper";

const HomeScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text variant="titleMedium" style={globalStyles.text}>
        Welcome
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
