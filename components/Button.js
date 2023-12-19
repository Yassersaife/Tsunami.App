import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Colors, Fonts, Sizes, Size } from "../constants/styles";

const PrimaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{ ...style.btnContainer, backgroundColor: Colors.DEFAULT_WHITE }}
      >
        <Text style={{ ...style.title, color: Colors.primaryColor }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: { ...Fonts.whiteColor18SemiBold },
  btnContainer: {
    backgroundColor: Colors.primaryColor,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { PrimaryButton, SecondaryButton };
