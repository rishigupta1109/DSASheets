import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResetPassword,
  ResetPasswordVerify,
  customisedNotification,
} from "../Services";

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

export function ForgotPassword() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [toggleOtpSection, setToggleOtpSection] = useState(false);
  const submitHandler = async () => {
    // console.log(email);
    if (email.trim() === "")
      return customisedNotification("error", "Email is required", "warning");
    try {
      const res = await ResetPassword(email);
      setToggleOtpSection(true);
      // console.log(res);
    } catch (err) {
      console.log(err);
      customisedNotification("error", "Something went wrong");
    }
  };
  const verifyHandler = async () => {
    if (email.trim() === "")
      return customisedNotification("error", "Email is required", "warning");
    else if (otp.trim() === "") {
      return customisedNotification("error", "OTP is required", "warning");
    } else if (password.trim() === "") {
      return customisedNotification("error", "Password is required", "warning");
    } else if (cpassword.trim() === "") {
      return customisedNotification(
        "error",
        "Confirm Password is required",
        "warning"
      );
    } else if (password !== cpassword) {
      return customisedNotification(
        "error",
        "Password and Confirm Password should be same",
        "warning"
      );
    } else if (password.length < 6) {
      return customisedNotification(
        "error",
        "Password should be atleast 6 characters long",
        "warning"
      );
    }
    console.log(email, password, otp);
    try {
      const res = await ResetPasswordVerify(email, password, otp);
      // console.log(res);
      customisedNotification(
        "success",
        "Password reset successfully",
        "success"
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
      customisedNotification("error", "Something went wrong");
    }
    setToggleOtpSection(false);
  };
  return (
    <Container
      sx={{
        minHeight: "80vh",
      }}
      size={460}
      my={30}
    >
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          onChange={(e) => {
            // console.log(e.target.value);
            setEmail(e.target.value);
          }}
          disabled={toggleOtpSection}
          label="Your email"
          placeholder="me@mantine.dev"
          required
        />
        {toggleOtpSection && (
          <TextInput
            label="OTP"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="0000"
            required
          />
        )}
        {toggleOtpSection && (
          <TextInput
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="New Password"
            placeholder="123456"
            required
            type="password"
          />
        )}
        {toggleOtpSection && (
          <TextInput
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
            label="Confirm Password"
            placeholder="123456"
            required
            type="password"
          />
        )}

        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor color="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <IconArrowLeft size={rem(12)} stroke={1.5} />
              <Box
                onClick={() => {
                  navigate("/login");
                }}
                ml={5}
              >
                Back to the login page
              </Box>
            </Center>
          </Anchor>
          <Button
            className={classes.control}
            onClick={toggleOtpSection ? verifyHandler : submitHandler}
          >
            {toggleOtpSection ? "Verify" : "Get Otp"}
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
