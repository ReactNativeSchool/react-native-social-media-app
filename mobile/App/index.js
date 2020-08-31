import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/client";

import { Feed } from "./screens/Feed";
import { Thread } from "./screens/Thread";
import { NewPost } from "./screens/NewPost";
import { Auth } from "./screens/Auth";

import { Button } from "./components/Button";
import { client, isAuthorized } from "./graphql/client";

const AppStack = createStackNavigator();
const AppStackScreen = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Feed"
      component={Feed}
      options={({ navigation }) => ({
        headerTitle: "Home",
        headerRight: () => (
          <Button
            text="New Post"
            onPress={async () => {
              const signedIn = await isAuthorized();
              if (signedIn) {
                navigation.navigate("NewPost");
              } else {
                navigation.navigate("Auth");
              }
            }}
          />
        ),
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
  <ApolloProvider client={client}>
    <NavigationContainer>
      <ModalStackScreen />
    </NavigationContainer>
  </ApolloProvider>
);
