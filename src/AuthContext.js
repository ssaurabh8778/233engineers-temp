import React, { useContext, useState, useEffect } from "react";
import firebase from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        console.log(JSON.stringify(user));
        setCurrentUser(user);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const value = {
    currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
