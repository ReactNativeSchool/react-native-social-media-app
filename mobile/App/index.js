import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";

import { Feed } from "./screens/Feed";
import { Thread } from "./screens/Thread";
import { NewPost } from "./screens/NewPost";
import { Auth } from "./screens/Auth";

import { Button } from "./components/Button";
import { client } from "./graphql/client";
import { AuthContextProvider, useAuth } from "./util/AuthManager";

const LogoutButton = () => {
  const { isAuthorized, setAuthToken } = useAuth();

  if (!isAuthorized) {
    return null;
  }

  return (
    <View
      style={{
        transform: [{ rotateZ: "180deg" }],
      }}
    >
      <TouchableOpacity
        style={{ paddingHorizontal: 15 }}
        onPress={() => setAuthToken(null)}
      >
        <AntDesign name="logout" size={24} color="#6e7f8d" />
      </TouchableOpacity>
    </View>
  );
};

const NewPostButton = ({ navigation }) => {
  const { isAuthorized } = useAuth();
  return (
    <Button
      text="New Post"
      onPress={async () => {
        if (isAuthorized) {
          navigation.navigate("NewPost");
        } else {
          navigation.navigate("Auth");
        }
      }}
    />
  );
};

const AppStack = createStackNavigator();
const AppStackScreen = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Feed"
      component={Feed}
      options={({ navigation }) => ({
        headerLeft: () => <LogoutButton />,
        headerTitle: "Home",
        headerRight: () => <NewPostButton navigation={navigation} />,
      })}
    />
    <AppStack.Screen name="Thread" component={Thread} />
  </AppStack.Navigator>
);

const ModalStack = createStackNavigator();
const ModalStackScreen = () => (
  <ModalStack.Navigator mode="modal" headerMode="none">
    <ModalStack.Screen name="App" component={AppStackScreen} />
    <ModalStack.Screen name="NewPost" component={NewPost} />
    <ModalStack.Screen name="Auth" component={Auth} />
  </ModalStack.Navigator>
);

export default () => (
  <AuthContextProvider>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <ModalStackScreen />
      </NavigationContainer>
    </ApolloProvider>
  </AuthContextProvider>
);
