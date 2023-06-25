import { useContext, useEffect, useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Button,
  useMantineColorScheme,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from "@mantine/ds";
import logoDark from "../../../Images/sheetcode_dark.png";
import logoLight from "../../../Images/sheetcode_light.png";

import { NavLink, useNavigate } from "react-router-dom";
import { SegmentedToggle } from "./Toggle";
import globalContext from "../../Context/GlobalContext";
import UserMenu from "./UserMenu";
const HEADER_HEIGHT = rem(80);

const useStyles = createStyles((theme) => ({
  root: {
    position: "sticky",
    zIndex: 2,
    top: 0,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export function Navbar({ links }) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(
    links.find((link) => link.link === window.location.pathname)?.link
  );
  useEffect(() => {
    setActive(
      links.find((link) => link.link === window.location.pathname)?.link
    );
  }, [window.location.pathname]);
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const globalCtx = useContext(globalContext);
  const { colorScheme } = useMantineColorScheme();
  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        // event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </NavLink>
  ));
  const goalCompletedToday =
    new Date(globalCtx?.user?.lastGoal).getDate() === new Date().getDate() &&
    new Date(globalCtx?.user?.lastGoal).getMonth() === new Date().getMonth() &&
    new Date(globalCtx?.user?.lastGoal).getFullYear() ===
      new Date().getFullYear();
  function isYesterday(date) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid argument: you must provide a "date" instance');
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  }
  const goalCompletedYesterDay = isYesterday(
    new Date(globalCtx?.user?.lastGoal)
  );
  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        {/* <MantineLogo size={28} /> */}
        <img
          style={{
            cursor: "pointer",
            objectFit: "cover",
          }}
          onClick={() => navigate("/")}
          src={colorScheme === "dark" ? logoDark : logoLight}
          alt="logo"
          height={50}
        />
        <Group spacing={5} className={classes.links}>
          {items}

          {globalCtx.isUserLoggedIn && (
            <UserMenu
              onLogout={() => {
                navigate("/login");
                globalCtx.setIsUserLoggedIn(false);
                globalCtx.setToken(null);
                globalCtx.setUser(null);
                globalCtx.setIsUserAdmin(false);

                localStorage.removeItem("token");
              }}
            />
          )}

          {/* {!globalCtx.isUserLoggedIn && (
            <Group spacing={5} className={classes.links}>
              <Button onClick={() => navigate("/login")} variant="default">
                Log in
              </Button>
              <Button onClick={() => navigate("/register")}>Sign up</Button>
            </Group>
          )} */}
          {/* {globalCtx.isUserLoggedIn && (
            <Button
              onClick={() => {
                navigate("/");
                globalCtx.setIsUserLoggedIn(false);
                globalCtx.setToken(null);
                globalCtx.setUser(null);
                globalCtx.setIsUserAdmin(false);

                localStorage.removeItem("token");
              }}
            >
              Logout
            </Button>
          )} */}
        </Group>
        <SegmentedToggle />
        {goalCompletedToday && (
          <Badge
            color="green"
            size="xl"
            sx={{
              borderRadius: "100%",
              height: "2rem",
              width: "2rem",
              padding: "0.5rem",
              animation: "neon 2s infinite",
              boxShadow:
                colorScheme === "dark"
                  ? "0 0 5px #fff, 0 0 5px #fff, 0 0 15px #fff, 0 0 25px #b6ff00,0 0 35px #b6ff00, 0 0 45px #b6ff00, 0 0 5px #b6ff00, 0 0 5px #b6ff00 "
                  : "0 0 5px green, 0 0 5px lightgreen, 0 0 15px lightgreen, 0 0 25px green,0 0 35px #b6ff00, 0 0 45px #b6ff00, 0 0 5px #b6ff00, 0 0 5px #b6ff00 ",
            }}
            variant="filled"
          >
            {globalCtx?.user?.currentStreak}
          </Badge>
        )}
        {goalCompletedYesterDay && (
          <Badge
            sx={{
              borderRadius: "100%",
              height: "2rem",
              width: "2rem",
              padding: "0.5rem",
            }}
            color="green"
            size="xl"
            variant="outline"
          >
            {globalCtx?.user?.currentStreak}
          </Badge>
        )}
        {!goalCompletedYesterDay && !goalCompletedToday && (
          <Badge
            sx={{
              borderRadius: "100%",
              height: "2rem",
              width: "2rem",
              padding: "0.5rem",
            }}
            color="green"
            size="xl"
            variant="outlined"
          >
            0
          </Badge>
        )}

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              className={classes.dropdown}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: "1rem",
              }}
              withBorder
              style={styles}
            >
              {items}
              {globalCtx?.isUserLoggedIn && (
                <NavLink
                  key={"/profile"}
                  to={"/profile"}
                  className={cx(classes.link, {
                    [classes.linkActive]: active === "/profile",
                  })}
                  onClick={(event) => {
                    // event.preventDefault();
                    setActive("/profile");
                    close();
                  }}
                >
                  Profile
                </NavLink>
              )}
              {/* {!globalCtx.isUserLoggedIn && (
                <>
                  <Button
                    variant="default"
                    sx={{
                      display: "block",
                      margin: "1rem auto",
                    }}
                    onClick={() => {
                      toggle();
                      navigate("/login");
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    sx={{
                      margin: "1rem auto",
                      display: "block",
                    }}
                    onClick={() => {
                      toggle();
                      navigate("/register");
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )} */}
              {globalCtx.isUserLoggedIn && (
                <Button
                  onClick={() => {
                    navigate("/");
                    globalCtx.setIsUserLoggedIn(false);
                    globalCtx.setToken(null);
                    globalCtx.setUser(null);
                    globalCtx.setIsUserAdmin(false);
                    toggle();
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              )}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
