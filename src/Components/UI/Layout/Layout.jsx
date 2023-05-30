import React, { useContext } from "react";
import { Navbar } from "../Navbar/Navbar";
import globalContext from "../../Context/GlobalContext";

export default function Layout({ children }) {
  const linkGuest = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "All Sheets",
      link: "/allsheets",
    },
  ];
  const linkUser = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "All Sheets",
      link: "/allsheets",
    },
    {
      label: "LeaderBoard",
      link: "/leaderboard",
    },
    {
      label: "Friends",
      link: "/friends",
    },
  ];
  const linkAdmin = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "All Sheets",
      link: "/allsheets",
    },
    {
      label: "LeaderBoard",
      link: "/leaderboard",
    },
    {
      label: "Friends",
      link: "/friends",
    },
    {
      label: "Admin",
      link: "/admin",
    },
  ];
  const globalCtx = useContext(globalContext);
  return (
    <div>
      <Navbar
        links={
          globalCtx.isUserLoggedIn
            ? globalCtx.isUserAdmin
              ? linkAdmin
              : linkUser
            : linkGuest
        }
      />
      {children}
    </div>
  );
}
