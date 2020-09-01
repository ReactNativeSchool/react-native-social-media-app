import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useMutation } from "@apollo/client";

import { NewPostInput } from "../components/Form";
import { Header } from "../components/Header";
import { createPost } from "../graphql/mutations";
import { requestFeed, requestResponses } from "../graphql/queries";

export const NewPost = ({ navigation, route }) => {
  const parentPostId = route?.params?.parent?._id;
  const [statusText, setStatusText] = useState("");

  const refetchQueries = [];
  if (parentPostId) {
    refetchQueries.push({
      query: requestResponses,
      variables: { _id: parentPostId },
    });
  } else {
    refetchQueries.push({
      query: requestFeed,
    });
  }

  const [createPostFn] = useMutation(createPost, { refetchQueries });

  return (
    <>
      <Header
        onLeftPress={() => navigation.pop()}
        leftText="Cancel"
        onRightPress={() => {
          createPostFn({ variables: { text: statusText, parentPostId } }).then(
            () => {
              navigation.pop();
            }
          );
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
