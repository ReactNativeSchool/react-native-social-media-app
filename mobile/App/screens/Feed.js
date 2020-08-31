import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { Post, Separator } from "../components/Post";
import { requestFeed } from "../graphql/queries";

export const Feed = ({ navigation }) => {
  const { loading, data } = useQuery(requestFeed);

  const feed = data?.feed || [];

  return (
    <FlatList
      style={{ backgroundColor: "#fff" }}
      data={feed}
      renderItem={({ item }) => (
        <Post
          {...item}
          onRowPress={() => navigation.push("Thread", { status: item })}
          onHeartPress={() => alert("todo!")}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={(item) => item._id}
      ListFooterComponent={<View style={{ flex: 1, marginBottom: 60 }} />}
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
