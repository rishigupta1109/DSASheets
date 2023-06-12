import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  rem,
  Anchor,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantine/ds";
// import logo from "../../../Sheet Hub.png";

import logoDark from "../../../Images/sheetcode_dark.png";
import logoLight from "../../../Images/sheetcode_light.png";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group
          spacing={0}
          className={classes.links}
          position="left"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          noWrap
        >
          <img
            src={colorScheme === "dark" ? logoDark : logoLight}
            height={60}
            style={{
              cursor: "pointer",
            }}
          />
        </Group>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          Developed by{" "}
          <Anchor
            href="https://www.linkedin.com/in/rishi-gupta-027298204/"
            target="_blank"
            rel="noreferrer"
            sx={{
              textDecoration: "none",
              color: colorScheme === "dark" ? "white" : "black",
              fontWeight: "bold",
              cursor: "pointer",
              padding: "0.5rem",
            }}
          >
            {" "}
            Rishi Gupta
          </Anchor>
        </Group>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <Title order={5} weight={500}>
            Copyright © 2023
          </Title>
        </Group>
      </Container>
    </div>
  );
}
