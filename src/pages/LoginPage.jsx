import React, { useContext } from "react";
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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import globalContext from "../Components/Context/GlobalContext";
import { useForm } from "@mantine/form";
import { customisedNotification, login } from "../Services";
const LoginPage = () => {
  const navigate = useNavigate();
  const globalCtx = useContext(globalContext);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });
  const handleLogin = async () => {
    console.log(form);
    try {
      globalCtx.setLoading(true);
      const res = await login({
        email: form.values.email,
        password: form.values.password,
      });
      const data = res.data;
      // console.log(data);
      customisedNotification(
        "Success",
        "User logged in successfully",
        "success"
      );
      form.reset();
      // globalCtx.setToken(data.token);
      // globalCtx.setUser(data);
      // globalCtx.setIsUserLoggedIn(true);
      // console.log(data?.isAdmin);
      // globalCtx.setIsUserAdmin(data?.isAdmin || false);
      window.localStorage.setItem("token", data.token);
      await globalCtx.validateUserSession();
      navigate("/");
    } catch (err) {
      customisedNotification("Error", err?.response?.data?.message);
      console.log(err);
    }
    globalCtx.setLoading(false);
  };
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
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => {
            navigate("/register");
          }}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          error={form.errors.email && "Invalid email"}
          onChange={(event) => {
            form.setFieldValue("email", event.target.value);
          }}
          value={form.values.email}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={form.values.password}
          error={
            form.errors.password &&
            "Password should include at least 6 characters"
          }
          onChange={(event) => {
            form.setFieldValue("password", event.target.value);
          }}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor
            component="button"
            size="sm"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          onClick={form.onSubmit(() => {
            handleLogin();
          })}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
