import { useState } from "react";
import dayjs from "dayjs";
import {
  createStyles,
  UnstyledButton,
  Text,
  Paper,
  Group,
  rem,
  clsx,
} from "@mantine/core";
import { IconCrown } from "@tabler/icons-react";
import gold from "../../Images/Gold-crown-50.png";
import silver from "../../Images/silver-crown-50.png";
import bronze from "../../Images/bronze-crown-50.png";
import styles from "./TopPerformer.module.css";
const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    display: "flex",
    width: "60%",
    minWidth: rem(350),
    maxWidth: rem(800),

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.lg,
    color: theme.colors[theme.primaryColor][6],
  },

  stat: {
    paddingTop: theme.spacing.xl,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.white,
    width: "100%",
    maxWidth: rem(180),
    minWidth: rem(180),
  },
  label: {
    textTransform: "uppercase",
    fontWeight: 900,
    fontSize: theme.fontSizes.s,
    fontFamily: `sans-serif, ${theme.fontFamily}`,
    color: "black",
    lineHeight: 1.2,
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  username: {
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    fontFamily: `sans-serif, ${theme.fontFamily}`,
    color: "grey",
    lineHeight: 1.2,
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },

  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: theme.black,
  },

  count: {
    color: theme.colors.gray[6],
  },

  day: {
    fontSize: rem(44),
    fontWeight: 700,
    color: theme.white,
    lineHeight: 1,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  month: {
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    lineHeight: 1,
    textAlign: "center",
  },

  controls: {
    display: "flex",
    flexDirection: "column",
    marginRight: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 0,
      marginBottom: theme.spacing.xl,
    },
  },

  date: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
    width: "120px",
  },

  control: {
    height: rem(28),
    width: "100%",
    color: theme.colors[theme.primaryColor][2],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.md,
    transition: "background-color 50ms ease",

    [theme.fn.smallerThan("xs")]: {
      height: rem(34),
      width: rem(34),
    },

    "&:hover": {
      backgroundColor: theme.colors[theme.primaryColor][5],
      color: theme.white,
    },
  },

  controlIcon: {
    [theme.fn.smallerThan("xs")]: {
      transform: "rotate(-90deg)",
    },
  },
}));

export function TopPerformerCard({ users, month }) {
  const { classes } = useStyles();

  const stats = users.map((user, index) => (
    <Paper
      className={classes.stat}
      radius="md"
      shadow="md"
      p="xs"
      key={user.name}
    >
      <img
        height={80}
        src={index === 0 ? gold : index === 1 ? silver : bronze}
        className={classes.icon}
      />
      <div>
        <Text className={classes.label}>{user.name}</Text>
        <Text className={classes.username}>{user.username}</Text>
        <Text fz="xs" className={classes.count}>
          <span className={classes.value}>{user?.questions || 0}</span>
        </Text>
      </div>
    </Paper>
  ));

  const gradients = ["linear-gradient(-60deg, #ff5858 0%, #f09819 100%)"];
  return (
    <div
      className={clsx(classes.root, styles.card)}
      style={{
        background: gradients[Math.floor(Math.random() * gradients.length)],
      }}
    >
      <div className={classes.controls}>
        <div className={classes.date}>
          <Text className={classes.day}>
            {" "}
            {dayjs(new Date(new Date().setMonth(month))).format("MMMM")}
          </Text>
          <Text className={classes.month}>{new Date().getFullYear()}</Text>
        </div>
      </div>
      <Group sx={{ flex: 1 }}>{stats}</Group>
    </div>
  );
}
