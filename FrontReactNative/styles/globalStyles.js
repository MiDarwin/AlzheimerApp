import { StyleSheet, Platform } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    marginBottom: 0,
    backgroundColor: "#B3C8CF", // Genel arka plan rengi
  },
  textInput: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#E5E1DA",
  },

  button: { marginBottom: 10, backgroundColor: "#E5E1DA" },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: { marginTop: 1, marginLeft: 45, fontSize: 50 },
  text: { marginTop: 20, marginLeft: 45 },
});

export default globalStyles;
