import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useMutation } from "@apollo/client";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Form";
import { login } from "../graphql/mutations";
import { useAuth } from "../util/AuthManager";

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
  const { setAuthToken } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginFn] = useMutation(login);

  const handleSubmit = () => {
    if (isRegistering) {
      alert("todo!");
      return Promise.resolve();
    }

    return loginFn({
      variables: { username, password },
    }).then((res) => {
      setAuthToken(res?.data?.login?.token);
      navigation.pop();
    });
  };

  return (
    <>
      <Header onLeftPress={() => navigation.pop()} leftText="Cancel" />

      <ScrollView
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.headerText}>Sign in to Continue</Text>

        {isRegistering ? <Input placeholder="Name" /> : null}
        <Input
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry
        />

        <View style={styles.buffer} />
        <Button
          text={isRegistering ? "Register" : "Sign In"}
          onPress={handleSubmit}
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
