import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import PatientRegisterScreen from "../screens/PatientRegisterScreen";
import SpeechScreen from "../screens/SpeechScreen";
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Register"}>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} // Header'ı gizledik
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Header'ı gizledik
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Header'ı gizledik
        />
        <Stack.Screen
          name="PatientRegisterScreen"
          component={PatientRegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SpeechScreen"
          component={SpeechScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
