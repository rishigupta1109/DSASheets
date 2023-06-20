import React, { useContext, useState } from "react";
import { Container, Select, Text, Title, useMantineTheme } from "@mantine/core";
import { FriendsTable } from "../Components/UI/Table/FriendsTable";
import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useTimeout } from "@mantine/hooks";
import { customisedNotification, findUser } from "../Services";
import globalContext from "../Components/Context/GlobalContext";
import { useNavigate } from "react-router-dom";
const Friends = () => {
  const theme = useMantineTheme();
  const { user, colleges } = useContext(globalContext);
  const [college, setCollege] = useState("ALL");
  const [tout, setTout] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pattern, setPattern] = useState("");
  const searchHandler = async (event) => {
    setPattern(event?.target?.value);
    if (event?.target?.value?.trim() === "") return;
    if (tout) clearTimeout(tout);
    // console.log(event.target.value);
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await findUser(event.target.value);
        // console.log(res);
        setUsers(res.data.users.filter((u) => u?._id !== user?.userId));
      } catch (err) {
        customisedNotification("error", "Something went wrong");
        console.log(err);
      }
      setLoading(false);
    }, 1000);
    setTout(t);
  };
  const navigate = useNavigate();

  if (window.location.pathname !== "/friends") {
    navigate("/friends");
  }
  let filteredUsers;
  if (college === "ALL") {
    filteredUsers = users;
  } else {
    filteredUsers = users.filter((u) => u.college === college);
  }
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
        minHeight: "80vh",
        padding: "1rem",
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
        <Select
          sx={{
            marginLeft: "auto",
          }}
          label="College"
          placeholder="Pick one"
          searchable
          nothingFound="No options"
          data={["ALL", ...colleges]}
          value={college}
          onChange={(event) => {
            setCollege(event);
          }}
        />
        <TextInput
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          radius="xl"
          size="md"
          sx={{
            width: "100%",
          }}
          value={pattern}
          // rightSection={
          //   <ActionIcon
          //     size={32}
          //     radius="xl"
          //     color={theme.primaryColor}
          //     variant="filled"
          //   >
          //     {theme.dir === "ltr" ? (
          //       <IconArrowRight size="1.1rem" stroke={1.5} />
          //     ) : (
          //       <IconArrowLeft size="1.1rem" stroke={1.5} />
          //     )}
          //   </ActionIcon>
          // }
          placeholder="Search Friend using username"
          rightSectionWidth={42}
          onChange={searchHandler}
        />
      </Container>
      {users?.length > 0 && (
        <FriendsTable loading={loading} data={filteredUsers} />
      )}
      {users?.length === 0 && pattern?.trim().length > 0 && !loading && (
        <Text>No users found</Text>
      )}
    </Container>
  );
};

export default Friends;
