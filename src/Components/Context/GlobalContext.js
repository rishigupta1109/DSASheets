import React, { useEffect, useState } from "react";
import {
  customisedNotification,
  getSheet,
  getTopPerformers,
  getUniqueColleges,
  validateSession,
} from "../../Services";
import { useNavigate } from "react-router-dom";

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
  validateUserSession: async () => {},
  confetti: false,
  setConfetti: () => {},
  colleges: [],
  topPerformers: [],
});

export default globalContext;

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [confetti, setConfetti] = useState(false);
  const [topPerformers, setTopPerformers] = useState([]);
  const fetchSheets = async () => {
    try {
      setLoading(true);
      const res = await getSheet(user?.userId);
      const data = res?.data;
      // console.log(data.sheets);
      setSheets(data?.sheets);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      customisedNotification("Error", "Something went wrong");
      console.log(err);
    }
  };
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
        if (res.data?.college?.trim()?.length === 0)
          customisedNotification(
            "Reminder",
            "Please fill up your details",
            "warning"
          );
        setSheets(res.data?.sheets);
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
  const getColleges = async () => {
    try {
      const data = await getUniqueColleges();
      setColleges(data.data.colleges);
    } catch (err) {
      console.log(err);
    }
  };
  const getTopPerformersData = async () => {
    try {
      const data = await getTopPerformers();
      setTopPerformers(data?.data?.topPerformersPerMonth);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateUserSession();
    }
    getColleges();
    getTopPerformersData();
  }, []);
  // console.log(sheets);
  return (
    <globalContext.Provider
      value={{
        topPerformers,
        confetti,
        setConfetti,
        colleges,
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
