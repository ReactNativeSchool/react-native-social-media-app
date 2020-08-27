import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1ca1f2",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
});

export const Button = ({ onPress, text, theme = "default" }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.buttonText];

  if (theme === "inverse") {
    buttonStyles.push({ backgroundColor: "transparent" });
    textStyles.push({ color: "#1ca1f2" });
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};
