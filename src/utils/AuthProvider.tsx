import React, { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.config";

interface AuthContextProps {
  currentUser: any;
  isLoading: boolean;
  logout: () => void;
  data: any;
  dispatch: React.Dispatch<any>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const INITIAL_STATE = {
  chatId: "null",
  user: {},
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>({ name: "shoaib" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = () => {
    // Implement your logout logic here
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        setCurrentUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set isLoggedIn based on user's authentication state
      setIsLoading(false);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.user,
          chatId: action.chatId,
        };
      case "UPDATE_CHAT_ID":
        console.log("==action", { action });
        return {
          user: action.payload.user,
          chatId: action.payload.chatId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <AuthContext.Provider value={{ currentUser, logout, isLoading, data: state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
