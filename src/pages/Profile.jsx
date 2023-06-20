import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import globalContext from "../Components/Context/GlobalContext";
import { customisedNotification, updateUserData } from "../Services";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, setUser, setLoading } = useContext(globalContext);
  const [name, setName] = React.useState(user?.name || "");
  const [dailyGoal, setDailyGoal] = React.useState(user?.dailyGoal || "");
  const [revisitDays, setRevisitDays] = React.useState(user?.revisitDays || "");
  const [college, setCollege] = useState(user?.college || "");
  const updateHandler = async () => {
    // console.log(name, dailyGoal, revisitDays);
    try {
      setLoading(true);
      const res = await updateUserData(
        user?.userId,
        name,
        parseInt(dailyGoal),
        parseInt(revisitDays),
        college
      );
      // console.log(res);
      setUser(
        (prev) =>
          (prev = {
            ...prev,
            name,
            dailyGoal: parseInt(dailyGoal),
            revisitDays: parseInt(revisitDays),
            college,
          })
      );
      customisedNotification("success", "Updated successfully", "success");
    } catch (err) {
      customisedNotification("error", "Something went wrong");
      console.log(err);
    }
    setLoading(false);
  };
  const navigate = useNavigate();
  if (window.location.pathname !== "/profile") {
    navigate("/profile");
  }
  return (
    <Container
      size={420}
      my={40}
      sx={{
        minHeight: "80vh",
      }}
    >
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Account Information
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" value={user?.email} disabled />
        <TextInput label="Username" value={user?.username} disabled />
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <TextInput
          label="Daily Goal"
          value={dailyGoal}
          onChange={(e) => {
            setDailyGoal(e.target.value);
          }}
          required
        />
        <TextInput
          label="Revisit day"
          value={revisitDays}
          onChange={(e) => {
            setRevisitDays(e.target.value);
          }}
          required
        />
        <TextInput
          label="College"
          value={college}
          onChange={(e) => {
            setCollege(e.target.value);
          }}
          required
        />
        <Button onClick={updateHandler} fullWidth mt="xl">
          Save
        </Button>
      </Paper>
    </Container>
  );
};
