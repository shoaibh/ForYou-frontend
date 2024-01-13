import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState
} from "react";

interface AuthContextProps {
  currentUser:  any;
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = () => {
    // Implement your logout logic here

  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        console.log("==action",{action})
        return {
          user: action.payload.user,
          chatId: action.payload.chatId,
        };
      case "UPDATE_CHAT_ID":
        return {
          user: action.payload.user,
          chatId: action.payload.chatId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{ currentUser, logout, isLoading, data: state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
