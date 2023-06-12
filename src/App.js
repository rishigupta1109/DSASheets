import "./App.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Layout from "./Components/UI/Layout/Layout";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Topics from "./pages/Topics";
import AllSheets from "./pages/AllSheets";
import { Questions } from "./pages/Questions";
import LeaderBoard from "./pages/LeaderBoard";
import { AuthenticationForm } from "./pages/Login";
import Friends from "./pages/Friends";
import Admin from "./pages/Admin";
import EditTopics from "./pages/EditTopics";
import { EditQuestions } from "./pages/EditQuestions";
import { ModalsProvider } from "@mantine/modals";

import { Notifications } from "@mantine/notifications";
import globalContext from "./Components/Context/GlobalContext";
import { useContext, useEffect } from "react";
import { validateSession } from "./Services";
import CustomLoader from "./Components/UI/CustomLoader";
import { Profile } from "./pages/Profile";
import { ForgotPassword } from "./pages/ResetPassword";
const routerAdmin = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        {" "}
        <Home />
      </Layout>
    ),
  },
  {
    path: "/sheet/:sheet_id",
    element: (
      <Layout>
        <Topics />
      </Layout>
    ),
  },
  {
    path: "/sheet/:sheet_id/:topic_id/questions",
    element: (
      <Layout>
        <Questions />
      </Layout>
    ),
  },
  {
    path: "/allsheets",
    element: (
      <Layout>
        <AllSheets />
      </Layout>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <Layout>
        <LeaderBoard />
      </Layout>
    ),
  },
  {
    path: "/friends",
    element: (
      <Layout>
        <Friends />
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout>
        <Admin />
      </Layout>
    ),
  },
  {
    path: "/admin/:sheet_id",
    element: (
      <Layout>
        <EditTopics />
      </Layout>
    ),
  },
  {
    path: "/admin/:sheet_id/:topic_id/questions",
    element: (
      <Layout>
        <EditQuestions />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/*",
    element: (
      <Layout>
        <Navigate to={"/"} />
      </Layout>
    ),
  },
]);
const routerUser = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        {" "}
        <Home />
      </Layout>
    ),
  },
  {
    path: "/sheet/:sheet_id",
    element: (
      <Layout>
        <Topics />
      </Layout>
    ),
  },
  {
    path: "/sheet/:sheet_id/:topic_id/questions",
    element: (
      <Layout>
        <Questions />
      </Layout>
    ),
  },
  {
    path: "/allsheets",
    element: (
      <Layout>
        <AllSheets />
      </Layout>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <Layout>
        <LeaderBoard />
      </Layout>
    ),
  },

  {
    path: "/friends",
    element: (
      <Layout>
        <Friends />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/*",
    element: (
      <Layout>
        <Navigate to={"/"} replace={true} />
      </Layout>
    ),
  },
]);
const routerGuest = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Layout>
        <AuthenticationForm />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <AuthenticationForm />
      </Layout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Layout>
        <ForgotPassword />
      </Layout>
    ),
  },
  {
    path: "/*",
    element: (
      <Layout>
        <Navigate to={"/login"} replace={true} />
      </Layout>
    ),
  },
]);

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const { isUserAdmin, isUserLoggedIn, loading } = useContext(globalContext);

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <div>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,

            breakpoints: {
              xs: 0,
              sm: 768,
              md: 992,
              lg: 1200,
              xl: 1440,
              xxl: 1920,
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ModalsProvider>
            <Notifications position="top-right" zIndex={2077} />
            {loading && <CustomLoader />}
            <RouterProvider
              router={
                isUserLoggedIn
                  ? isUserAdmin
                    ? routerAdmin
                    : routerUser
                  : routerGuest
              }
            ></RouterProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
