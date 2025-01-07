import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    marginBottom: 0,
    backgroundColor: "#B3C8CF", // Genel arka plan rengi
  },
  activityContainer: {
    flex: 1, // Tüm ekranı kaplayacak şekilde genişler
    justifyContent: "center", // Dikey eksende ortalar
    alignItems: "center", // Yatay eksende ortalar
    padding: 20, // İç kenar boşluğu
    marginBottom: 0, // Alt boşluğu sıfırlar
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
  innerContainer: {
    padding: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  SegmentedButtons: {
    marginBottom: 10,
    backgroundColor: "#B3C8CF",
  },
  title: {
    position: "relative",
    top: height * 0.01,
    alignSelf: "center",
    fontSize: width * 0.12,
    marginBottom: 10,
  },
  text: { marginTop: 20, marginLeft: 45 },
});

export default globalStyles;
