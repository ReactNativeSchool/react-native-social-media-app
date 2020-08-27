import React from "react";
import { FlatList, View } from "react-native";

import { Post, Separator } from "../components/Post";

export const Feed = ({ navigation }) => {
  return (
    <FlatList
      style={{ backgroundColor: "#fff" }}
      data={[
        {
          _id: "0",
          userId: "user-1",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          publishedAt: "2020-08-26T16:07:04.796Z",
          parentPostId: null,
          user: {
            avatarUri: "https://picsum.photos/id/238/200",
            name: "John Doe",
            username: "john_doe",
          },
        },
        {
          _id: "1",
          userId: "user-1",
          text: "Vivamus sodales ex a nisl pellentesque laoreet.",
          publishedAt: "2020-08-26T16:07:04.796Z",
          parentPostId: null,
          user: {
            avatarUri: "https://picsum.photos/id/238/200",
            name: "John Doe",
            username: "john_doe",
          },
        },
      ]}
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
    />
  );
};
