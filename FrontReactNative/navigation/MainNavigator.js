import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token); // Eğer token varsa true, yoksa false yap
      } catch (error) {
        console.error("Error checking token", error);
        setIsLoggedIn(false);
      }
    };

    checkUserToken();
  }, []);

  if (isLoggedIn === null) {
    // Eğer token durumu hala kontrol ediliyorsa bir yükleme ekranı gösterebiliriz
    return null; // Bu kısımda bir loading spinner dönebilirsin
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
