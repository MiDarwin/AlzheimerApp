import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "219565927373-7bkvf7lgg537i35h508pptbc0q51ekus.apps.googleusercontent.com", // Firebase Console'den aldığınız Web Client ID'yi buraya ekleyin
});
const LoginScreen = () => {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      await auth().signInWithCredential(googleCredential);
      console.log("Google ile giriş başarılı!");
    } catch (error) {
      console.log("Error signing in with Google: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <Image
          source={require("../assets/google-icon.png")} // Google simgesi burada
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
