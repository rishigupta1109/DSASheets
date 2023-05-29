import React from "react";
import { Container, Title, useMantineTheme } from "@mantine/core";
import { FriendsTable } from "../Components/UI/Table/FriendsTable";
import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
const Friends = () => {
  const theme = useMantineTheme();
  const data = [
    {
      username: "rishigupta1109",
      name: "Rishi Gupta",
      sheets: 5,
      questions: 200,
      completed: 150,
    },

    {
      username: "pjain0510",
      name: "Pranav Jain",
      sheets: 0,
      questions: 200,
      completed: 0,
    },
  ];

  return (
    <Container
      fluid
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        overflow: "auto",
      }}
    >
      <Title align="center">Friends</Title>
      <Container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <TextInput
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          radius="xl"
          size="md"
          sx={{
            width: "100%",
          }}
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
            >
              {theme.dir === "ltr" ? (
                <IconArrowRight size="1.1rem" stroke={1.5} />
              ) : (
                <IconArrowLeft size="1.1rem" stroke={1.5} />
              )}
            </ActionIcon>
          }
          placeholder="Search Friend"
          rightSectionWidth={42}
        />
      </Container>
      <FriendsTable data={data} />
    </Container>
  );
};

export default Friends;
