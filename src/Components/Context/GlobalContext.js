import React, { useEffect, useState } from "react";
import {
  customisedNotification,
  getSheet,
  validateSession,
} from "../../Services";

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
  const [sheets, setSheets] = useState([]);
  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const res = await getSheet(user?.userId);
        const data = res?.data;
        console.log(data.sheets);
        setSheets(data?.sheets);
      } catch (err) {
        customisedNotification("Error", "Something went wrong");
        console.log(err);
      }
    };
    fetchSheets();
  }, [user]);
  useEffect(() => {
    const validateUserSession = async () => {
      try {
        const res = await validateSession();
        if (res.status === 200) {
          // console.log(res.data);
          setIsUserAdmin(res.data.isAdmin);
          setIsUserLoggedIn(true);
          setToken(res.data.token);
          setUser(res.data);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setIsUserAdmin(false);
        setIsUserLoggedIn(false);
        setToken(null);
        setUser(null);
        console.log(err);
      }
    };
    validateUserSession();
  }, []);
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
        sheets,
        setSheets,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
