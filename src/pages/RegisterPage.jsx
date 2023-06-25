import React, { useContext, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import globalContext from "../Components/Context/GlobalContext";
import { customisedNotification, getOtp, signup, verifyOtp } from "../Services";
import { createStyles, Center, Box, rem } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

const RegisterPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [otp, setOtp] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      name: "",
      password: "",
      college: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      name: (val) =>
        val.length <= 3 ? "Name should include at least 3 characters" : null,
      username: (val) =>
        val.length <= 3
          ? "Username should include at least 3 characters"
          : null,
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      college: (val) =>
        val.length <= 3 ? "College should include at least 3 characters" : null,
    },
  });
  const { setLoading, colleges } = useContext(globalContext);
  const getOtpHandler = async () => {
    try {
      setLoading(true);
      const data = await getOtp(form.values.email, form.values.username);
      console.log(data);
      setPage(1);
    } catch (err) {
      console.log(err);
      customisedNotification("Error", err?.message || "something went wrong");
      setPage(0);
    }
    setLoading(false);
  };
  const verifyOtpHandler = async () => {
    if (otp.trim().length === 0) {
      return customisedNotification("Warning", "Write OTP", "warning");
    }
    try {
      setLoading(true);
      const data = await verifyOtp(form.values.email, otp);
      if (data.status === 200) {
        const res = await signup({
          email: form.values.email,
          username: form.values.username,
          password: form.values.password,
          college: form.values.college,
          name: form.values.name,
        });
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      return customisedNotification(
        "Error",
        err?.message || "something went wring"
      );
    }
    setLoading(false);
  };

  const { classes } = useStyles();
  if (page) {
    return (
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Verify OTP
        </Title>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Email" value={form.values.email} disabled />
          <TextInput
            label="OTP"
            placeholder="Write otp here"
            required
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            value={otp}
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft
                  size={rem(12)}
                  stroke={1.5}
                  onClick={() => {
                    navigate(-1);
                  }}
                />
                <Box ml={5}>Back to the signup page</Box>
              </Center>
            </Anchor>
            <Button onClick={verifyOtpHandler} className={classes.control}>
              Verify
            </Button>
          </Group>
        </Paper>
      </Container>
    );
  }
  return (
    <Container
      size={420}
      my={40}
      sx={{
        minHeight: "70vh",
      }}
    >
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to SheetCode!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={form.values.email}
          onChange={(event) => {
            form.setFieldValue("email", event.target.value);
          }}
          error={form.errors.email && "Invalid email"}
        />
        <TextInput
          label="Name"
          placeholder="mantine"
          required
          value={form.values.name}
          onChange={(event) => {
            form.setFieldValue("name", event.target.value);
          }}
          error={
            form.errors.name && "Name should include at least 3 characters"
          }
        />
        <TextInput
          label="User Name"
          placeholder="mantine"
          required
          value={form.values.username}
          onChange={(event) => {
            form.setFieldValue("username", event.target.value);
          }}
          error={
            form.errors.username &&
            "Username should include at least 3 characters"
          }
        />

        <Select
          label="College"
          placeholder="Pick one ore create One"
          searchable
          nothingFound="No options"
          creatable
          data={colleges}
          value={form.values.college}
          onChange={(event) => {
            form.setFieldValue("college", event);
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          value={form.values.password}
          onChange={(event) => {
            form.setFieldValue("password", event.target.value);
          }}
          error={
            form.errors.password &&
            "Password should include at least 6 characters"
          }
          mt="md"
        />

        <Button
          fullWidth
          mt="xl"
          onClick={form.onSubmit(() => {
            getOtpHandler();
          })}
        >
          Sign up
        </Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
