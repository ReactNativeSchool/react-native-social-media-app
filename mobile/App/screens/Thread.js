import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";

import { Post, Separator } from "../components/Post";
import { Button } from "../components/Button";
import { requestResponses } from "../graphql/queries";
import { useAuth } from "../util/AuthManager";

export const Thread = ({ navigation, route }) => {
  const { isAuthorized } = useAuth();

  const originalStatus = route?.params?.status;

  const { loading, data } = useQuery(requestResponses, {
    variables: { _id: originalStatus._id },
  });

  const thread = data?.responses || [];

  return (
    <FlatList
      style={{ backgroundColor: "#fff" }}
      data={thread}
      renderItem={({ item }) => (
        <Post {...item} indent={item._id !== originalStatus._id} />
      )}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={(item) => item._id}
      ListFooterComponent={
        <View
          style={{
            flex: 1,
            marginBottom: 60,
            marginHorizontal: 30,
            marginTop: 10,
          }}
        >
          <Button
            text="New Reply"
            onPress={() => {
              if (isAuthorized) {
                navigation.push("NewPost", { parent: originalStatus });
              } else {
                navigation.push("Auth");
              }
            }}
          />
        </View>
      }
      ListEmptyComponent={
        loading ? (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" />
          </View>
        ) : null
      }
    />
  );
};
