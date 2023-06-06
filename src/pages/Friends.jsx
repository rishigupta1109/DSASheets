import React, { useContext, useState } from "react";
import { Container, Title, useMantineTheme } from "@mantine/core";
import { FriendsTable } from "../Components/UI/Table/FriendsTable";
import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useTimeout } from "@mantine/hooks";
import { customisedNotification, findUser } from "../Services";
import globalContext from "../Components/Context/GlobalContext";
const Friends = () => {
  const theme = useMantineTheme();
  const { user } = useContext(globalContext);
  const [tout, setTout] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchHandler = async (event) => {
    if (tout) clearTimeout(tout);
    console.log(event.target.value);
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await findUser(event.target.value);
        console.log(res);
        setUsers(res.data.users.filter((u) => u?._id !== user?.userId));
      } catch (err) {
        customisedNotification("error", "Something went wrong");
        console.log(err);
      }
      setLoading(false);
    }, 1000);
    setTout(t);
  };
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
      <Title align="center" order={1} italic>
        Friends
      </Title>
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
          placeholder="Search Friend using username"
          rightSectionWidth={42}
          onChange={searchHandler}
        />
      </Container>
      <FriendsTable loading={loading} data={users} />
    </Container>
  );
};

export default Friends;
