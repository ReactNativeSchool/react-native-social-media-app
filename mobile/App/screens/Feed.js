import React from "react";
import { View, Button } from "react-native";

export const Feed = ({ navigation }) => {
  return (
    <View>
      <Button title="Thread" onPress={() => navigation.push("Thread")} />
      <Button title="NewPost" onPress={() => navigation.push("NewPost")} />
    </View>
  );
};
