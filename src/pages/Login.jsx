import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { useLocation, useNavigate } from "react-router-dom";
import { customisedNotification, login, signup } from "../Services";
import { notifications } from "@mantine/notifications";
import { useContext } from "react";
import globalContext from "../Components/Context/GlobalContext";

export function AuthenticationForm(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const location = useLocation();
  const navigate = useNavigate();
  location.pathname.includes("register") && type === "login" && toggle();
  location.pathname.includes("login") && type === "register" && toggle();
  const globalCtx = useContext(globalContext);
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      name: (val) =>
        type === "login"
          ? null
          : val.length <= 3
          ? "Name should include at least 3 characters"
          : null,
      username: (val) =>
        type === "login"
          ? null
          : val.length <= 3
          ? "Username should include at least 3 characters"
          : null,
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const handleLogin = async () => {
    console.log(form.values);
    try {
      const res = await login({
        email: form.values.email,
        password: form.values.password,
      });
      const data = res.data;
      console.log(data);
      customisedNotification(
        "Success",
        "User logged in successfully",
        "success"
      );
      form.reset();
      globalCtx.setToken(data.token);
      globalCtx.setUser(data.user);
      globalCtx.setIsUserLoggedIn(true);
      console.log(data?.isAdmin);
      globalCtx.setIsUserAdmin(data?.isAdmin || false);
      window.localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      customisedNotification("Error", err?.response?.data?.message);
      console.log(err);
    }
  };
  const handleRegister = async () => {
    try {
      const data = await signup({
        email: form.values.email,
        password: form.values.password,
        name: form.values.name,
        username: form.values.username,
      });
      customisedNotification(
        "Success",
        "User registered successfully",
        "success"
      );
      form.reset();
      navigate("/login");
      console.log(data);
    } catch (err) {
      customisedNotification("Error", err?.response?.data?.message);
      console.log(err);
    }
  };
  return (
    <Container size={"xs"}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to SheetHub , {type} with
        </Text>
        {/* 
      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

        <form
          onSubmit={form.onSubmit(() => {
            type === "login" ? handleLogin() : handleRegister();
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}
            {type === "register" && (
              <TextInput
                label="Username"
                placeholder="Your username"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue("username", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => {
                navigate(type === "login" ? "/register" : "/login");
              }}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
