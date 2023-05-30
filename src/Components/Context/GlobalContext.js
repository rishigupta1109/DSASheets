import React, { useState } from "react";

const globalContext = React.createContext({
  user: null,
  setUser: () => {},
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
  isUserAdmin: false,
  setIsUserAdmin: () => {},
  token: null,
  setToken: () => {},
});

export default globalContext;

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [token, setToken] = useState(null);
  return (
    <globalContext.Provider
      value={{
        user,
        setUser,
        isUserLoggedIn,
        setIsUserLoggedIn,
        isUserAdmin,
        setIsUserAdmin,
        token,
        setToken,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
