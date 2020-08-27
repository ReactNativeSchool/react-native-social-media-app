import React, { useState } from "react";
import { ScrollView } from "react-native";

import { NewPostInput } from "../components/Form";
import { Header } from "../components/Header";

export const NewPost = ({ navigation }) => {
  const [statusText, setStatusText] = useState("");

  return (
    <>
      <Header
        onLeftPress={() => navigation.pop()}
        leftText="Cancel"
        onRightPress={() => {
          alert(statusText);
          navigation.pop();
        }}
        rightText="Post"
      />

      <ScrollView
        style={{ backgroundColor: "rgba(27,31,35,.05)" }}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: "rgba(27,31,35,.05)",
        }}
      >
        <NewPostInput
          placeholder="What's the latest?"
          onChangeText={(text) => setStatusText(text)}
        />
      </ScrollView>
    </>
  );
};
