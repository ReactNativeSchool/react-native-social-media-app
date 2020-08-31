import { ApolloClient, InMemoryCache, HttpLink, concat } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { setContext } from "@apollo/client/link/context";

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

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const authMiddleware = setContext((request, context) => {
  return getAuthToken()
    .then((token) => {
      return {
        ...context,
        headers: {
          ...context.headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    })
    .catch(() => {
      return context;
    });
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
