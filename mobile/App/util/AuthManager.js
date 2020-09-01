import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const AUTH_KEY = "SocialApp::AUTH_TOKEN";

export const getAuthToken = () => AsyncStorage.getItem(AUTH_KEY);

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
      setIsAuthorized(true);
      return AsyncStorage.setItem(AUTH_KEY, token);
    }

    setIsAuthorized(false);
    return AsyncStorage.removeItem(AUTH_KEY);
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
