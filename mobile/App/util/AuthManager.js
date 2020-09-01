import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AUTH_KEY = "AUTH_TOKEN";

export const getAuthToken = () => SecureStore.getItemAsync(AUTH_KEY);

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    getAuthToken()
      .then((token) => {
        if (token) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      })
      .catch(() => {
        setIsAuthorized(false);
      });
  }, []);

  const setAuthToken = (token) => {
    if (token) {
      return SecureStore.setItemAsync(AUTH_KEY, token).then(() =>
        setIsAuthorized(true)
      );
    }

    return SecureStore.deleteItemAsync(AUTH_KEY).then(() =>
      setIsAuthorized(false)
    );
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
