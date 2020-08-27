import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Feed } from "./screens/Feed";
import { Thread } from "./screens/Thread";
import { NewPost } from "./screens/NewPost";

import { Button } from "./components/Button";

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
            onPress={() => navigation.navigate("NewPost")}
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
  </ModalStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ModalStackScreen />
  </NavigationContainer>
);
