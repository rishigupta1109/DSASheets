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
            link: "/mysheets",
          },
          {
            label: "LeaderBoard",
            link: "/leaderboard",
          },
        ]}
      />
      {children}
    </div>
  );
}
