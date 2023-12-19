import React, { useEffect } from "react";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";
import { Stack, ActivityIndicator } from "@react-native-material/core";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Montserrat_Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
        Montserrat_Medium: require("../assets/fonts/Montserrat-Medium.ttf"),
        Montserrat_SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
        Montserrat_Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
      });
      navigation.navigate("Splash");
    }
    loadFont();
  });

  return (
    <Stack fill center spacing={1}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </Stack>
  );
};

export default LoadingScreen;
