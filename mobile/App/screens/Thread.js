import React from "react";
import { FlatList, View } from "react-native";

import { Post, Separator } from "../components/Post";
import { Button } from "../components/Button";

export const Thread = ({ navigation, route }) => {
  const originalStatus = route?.params?.status;

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
          _id: "r-0",
          userId: "user-2",
          text: "Sed facilisis nibh sed semper pulvinar.",
          publishedAt: "2020-08-26T16:07:04.796Z",
          parentPostId: "0",
          user: {
            avatarUri: "https://picsum.photos/id/237/200",
            name: "Jane Doe",
            username: "jane_doe",
          },
        },
        {
          _id: "r-1",
          userId: "user-2",
          text: "Nulla pretium massa nec velit tincidunt facilisis.",
          publishedAt: "2020-08-26T16:07:04.796Z",
          parentPostId: "0",
          user: {
            avatarUri: "https://picsum.photos/id/237/200",
            name: "Jane Doe",
            username: "jane_doe",
          },
        },
        {
          _id: "r-2",
          userId: "user-2",
          text: "Mauris placerat nisi at tempus porttitor.",
          publishedAt: "2020-08-26T16:07:04.796Z",
          parentPostId: "0",
          user: {
            avatarUri: "https://picsum.photos/id/237/200",
            name: "Jane Doe",
            username: "jane_doe",
          },
        },
      ]}
      renderItem={({ item }) => (
        <Post
          {...item}
          onHeartPress={() => alert("todo!")}
          indent={item._id !== originalStatus._id}
        />
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
            onPress={() =>
              navigation.push("NewPost", { parent: originalStatus })
            }
          />
        </View>
      }
    />
  );
};
