import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Form";

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 30,
    marginBottom: 10,
    color: "#222222",
  },
  container: {
    paddingHorizontal: 10,
  },
  buffer: {
    height: 20,
  },
});

export const Auth = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <Header onLeftPress={() => navigation.pop()} leftText="Cancel" />

      <ScrollView
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.headerText}>Sign in to Continue</Text>

        {isRegistering ? <Input placeholder="Name" /> : null}
        <Input placeholder="Username" />
        <Input placeholder="Password" />

        <View style={styles.buffer} />
        <Button
          text={isRegistering ? "Register" : "Sign In"}
          onPress={() => alert("todo!")}
        />
        <View style={styles.buffer} />
        <Button
          theme="inverse"
          text={
            isRegistering
              ? "Already have an account? Sign in."
              : "No Account? Register."
          }
          onPress={() => setIsRegistering((val) => !val)}
        />
      </ScrollView>
    </>
  );
};
