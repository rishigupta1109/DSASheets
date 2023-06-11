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
  sheets: [],
  setSheets: () => {},
  loading: false,
  setLoading: () => {},
  validateUserSession: () => {},
});

export default globalContext;

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchSheets = async () => {
    try {
      setLoading(true);
      const res = await getSheet(user?.userId);
      const data = res?.data;
      console.log(data.sheets);
      setSheets(
        data?.sheets?.sort((a, b) => {
          let completeda =
            a?.questions?.filter((question) => question.isCompleted)?.length ||
            0;
          let remaininga = a?.questions?.length - completeda;
          let completedb =
            b?.questions?.filter((question) => question.isCompleted)?.length ||
            0;
          let remainingb = b?.questions?.length - completedb;
          return remainingb - remaininga;
        })
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      customisedNotification("Error", "Something went wrong");
      console.log(err);
    }
  };
  useEffect(() => {}, [user]);
  const validateUserSession = async () => {
    try {
      setLoading(true);
      const res = await validateSession();
      if (res.status === 200) {
        // console.log(res.data);
        setIsUserAdmin(res.data.isAdmin);
        setIsUserLoggedIn(true);
        setToken(res.data.token);
        setUser(res.data);
        setSheets(
          res.data?.sheets?.sort((a, b) => {
            let completeda =
              a?.questions?.filter((question) => question.isCompleted)
                ?.length || 0;
            let remaininga = a?.questions?.length - completeda;
            let completedb =
              b?.questions?.filter((question) => question.isCompleted)
                ?.length || 0;
            let remainingb = b?.questions?.length - completedb;
            return remainingb - remaininga;
          })
        );
      }
    } catch (err) {
      localStorage.removeItem("token");
      fetchSheets();
      setIsUserAdmin(false);
      setIsUserLoggedIn(false);
      setToken(null);
      setUser(null);
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      fetchSheets();
    } else {
      validateUserSession();
    }
  }, []);
  console.log(sheets);
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
        loading,
        setLoading,
        validateUserSession,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
