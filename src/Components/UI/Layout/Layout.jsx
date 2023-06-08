import React, { useContext, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import globalContext from "../../Context/GlobalContext";
import { Anchor, Breadcrumbs, Container, Progress, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowLeft, IconArrowLeftBar } from "@tabler/icons-react";
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
  let topics = [];
  const [quesCompleted, setQuesCompleted] = React.useState(0);
  let dailyGoalQues = globalCtx?.user?.dailyGoal || 0;
  useEffect(() => {
    if (globalCtx.user?.dailyGoal) {
      dailyGoalQues = globalCtx.user?.dailyGoal;
    }
    let quesCompletedToday = 0;

    globalCtx?.sheets?.forEach((sheet) => {
      sheet?.questions?.forEach((question) => {
        if (!question?.isCompleted) return;
        const date = new Date(question?.completedAt);
        const today = new Date();
        // console.log(date, today);
        if (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        ) {
          quesCompletedToday += 1;
        }
      });
    });
    setQuesCompleted(quesCompletedToday);
    console.log(quesCompletedToday, dailyGoalQues);
  }, [globalCtx, globalCtx.sheets]);
  const percentage = (quesCompleted / dailyGoalQues) * 100;
  // globalCtx.sheets.forEach((sheet) => {
  //   topics.push(...sheet.topics.map((topic) => topic._id));
  // });
  // const isTopicId = (id) => {
  //   console.log(id, topics, topics.includes(id));
  //   return topics.includes(id);
  // };
  // console.log(topics);
  // let items = window.location.pathname
  //   .slice(1)
  //   .split("/")
  //   .map((item, index) => {
  //     if (isTopicId(item)) {
  //       return {
  //         title: item[0].toUpperCase() + item.slice(1),
  //       };
  //     }
  //     if (item === "") {
  //       return false;
  //     }
  //     return (
  //       item !== "" && {
  //         title: item[0].toUpperCase() + item.slice(1),
  //         href: window.location.pathname
  //           .split("/")
  //           .slice(0, index + 2)
  //           .join("/"),
  //       }
  //     );
  //   })
  //   .map((item, index) => {
  //     console.log(item, index);
  //     if (
  //       !item?.href ||
  //       index === window.location.pathname.split("/").length - 2
  //     ) {
  //       return <Text>{item?.title}</Text>;
  //     }
  //     return (
  //       <Link to={item?.href} key={index}>
  //         {item?.title}
  //       </Link>
  //     );
  //   });

  // if (window.location.pathname.split("/")[0] === "allsheets")
  //   items = [<Link to="/allsheets">All Sheets</Link>, ...items];
  // else if (window.location.pathname.split("/")[0] === "leaderboard")
  //   items = [<Link to="/leaderboard">Leaderboard</Link>, ...items];
  // else if (window.location.pathname.split("/")[0] === "friends")
  //   items = [<Link to="/friends">Friends</Link>, ...items];
  // else if (window.location.pathname.split("/")[0] === "")
  //   items = [<Link to="/">Home</Link>, ...items];
  // if (window.location.pathname === "/") items = [<Text>Home</Text>];
  // else if (window.location.pathname === "/allsheets")
  //   items = [<Text>All Sheets</Text>];
  // else if (window.location.pathname === "/leaderboard")
  //   items = [<Text>Leaderboard</Text>];
  // else if (window.location.pathname === "/friends")
  //   items = [<Text>Friends</Text>];

  // console.log(items);
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
      {dailyGoalQues !== 0 && (
        <Progress
          striped
          color={percentage >= 100 ? "green  " : "indigo"}
          label={
            percentage >= 100
              ? "Daily Goal Completed"
              : `Daily Goal ${quesCompleted}/${dailyGoalQues}`
          }
          size="xl"
          style={{
            position: "sticky",
            zIndex: 1,
            top: "4rem",
          }}
          value={Math.min(percentage, 100)}
        />
      )}
      {/* <Container
        sx={{
          width: "100%",
          margin: "2rem 0",
        }}
      >
        {items.length > 1 && <Breadcrumbs>{items}</Breadcrumbs>}
      </Container> */}

      {children}
    </div>
  );
}
