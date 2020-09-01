import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useMutation } from "@apollo/client";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Form";
import { login, register } from "../graphql/mutations";
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
  errorMessage: {
    color: "tomato",
  },
});

export const Auth = ({ navigation }) => {
  const { setAuthToken } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const [loginFn] = useMutation(login);
  const [registerFn] = useMutation(register);

  const handleSubmit = () => {
    if (isRegistering) {
      return registerFn({
        variables: { username, name, password },
      })
        .then(() => {
          return loginFn({
            variables: { username, password },
          });
        })
        .then((res) => {
          setAuthToken(res?.data?.login?.token);
          navigation.pop();
        })
        .catch((error) => {
          setError(error.message);
        });
    }

    return loginFn({
      variables: { username, password },
    })
      .then((res) => {
        setAuthToken(res?.data?.login?.token);
        navigation.pop();
      })
      .catch((error) => {
        setError(error.message);
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

        {isRegistering ? (
          <Input placeholder="Name" onChangeText={(text) => setName(text)} />
        ) : null}
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

        <Text style={styles.errorMessage}>{errorMessage}</Text>
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
