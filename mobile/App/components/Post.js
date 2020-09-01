import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import { likePost } from "../graphql/mutations";
import { useAuth } from "../util/AuthManager";

const Screen = Dimensions.get("window");

const AVATAR_SIZE = Screen.width * 0.15;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",
  },
  rowIndented: {
    marginLeft: 30,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: 10,
  },
  right: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222222",
  },
  textUsername: {
    fontSize: 15,
    marginLeft: 5,
    color: "#4f5153",
  },
  textPost: {
    fontSize: 15,
    color: "#4f5153",
  },
  actions: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heart: {
    width: 20,
    height: 20,
    tintColor: "#6e7f8d",
  },
  heartFilled: {
    tintColor: "#df245e",
  },
  textDate: {
    color: "#6e7f8d",
    fontSize: 14,
  },
});

export const Post = ({
  _id,
  user = {},
  text,
  isLiked = false,
  onRowPress,
  publishedAt,
  indent,
}) => {
  const { isAuthorized } = useAuth();
  const [likePostFn] = useMutation(likePost);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={onRowPress}>
      <View style={[styles.row, indent && styles.rowIndented]}>
        <View>
          <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
        </View>
        <View style={styles.right}>
          <View style={styles.header}>
            <Text style={styles.textName}>{user.name}</Text>
            <Text style={styles.textUsername}>{user.username}</Text>
          </View>
          <Text style={styles.textPost}>{text}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => {
                if (isAuthorized) {
                  likePostFn({ variables: { postId: _id } });
                } else {
                  navigation.push("Auth");
                }
              }}
            >
              {isLiked ? (
                <Image
                  style={[styles.heart, styles.heartFilled]}
                  source={require("../assets/icons/heart.png")}
                />
              ) : (
                <Image
                  style={styles.heart}
                  source={require("../assets/icons/heart-border.png")}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.textDate}>
              {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Separator = () => (
  <View style={{ height: 1, flex: 1, backgroundColor: "#e6ecf0" }} />
);
