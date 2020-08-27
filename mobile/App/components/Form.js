import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  newPostContainer: {
    flexDirection: "row",
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  newPostInput: {
    flex: 1,
    alignItems: "center",
    textAlignVertical: "top",
  },
  container: {
    marginVertical: 10,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#222222",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    paddingVertical: 10,
  },
});

export const NewPostInput = ({ label, ...props }) => (
  <View style={styles.newPostContainer}>
    <TextInput
      style={styles.newPostInput}
      multiline
      numberOfLines={6}
      {...props}
    />
  </View>
);

export const Input = ({ ...props }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{props.placeholder}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);
