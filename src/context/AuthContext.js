//AuthContext.js
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  uid: null,
  displayname: null,
  cash:  null,
  company: ""|| null,
  stockCount: 0,
  sum: 0,
  data:[],
  progress:0,
  score:0,
  img:null
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ ... state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
