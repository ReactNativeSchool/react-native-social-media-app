import ApolloClient from "apollo-boost";
import AsyncStorage from "@react-native-community/async-storage";

const AUTH_KEY = "SocialApp::AUTH_TOKEN";

export const isAuthorized = () =>
  AsyncStorage.getItem(AUTH_KEY).then((token) => {
    if (token) {
      return true;
    }

    return false;
  });

export const setAuthToken = (token) => AsyncStorage.setItem(AUTH_KEY, token);

export const getAuthToken = () => AsyncStorage.getItem(AUTH_KEY);

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  request: async (operation) => {
    try {
      const token = await getAuthToken();
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("error occurred while setting auth token", error);
    }
  },
});
