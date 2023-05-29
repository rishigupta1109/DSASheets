import React from "react";
import { Navbar } from "../Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar
        links={[
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
        ]}
      />
      {children}
    </div>
  );
}
