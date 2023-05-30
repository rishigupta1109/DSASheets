import { notifications } from "@mantine/notifications";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const signup = async (body) => {
  const data = await axios.post("api/user/signup", body);
  return data;
};
const login = async (body) => {
  console.log(process.env.REACT_APP_SERVER_URL);
  const data = await axios.post("api/user/login", body);
  return data;
};
const checkUserName = async (body) => {
  const data = await axios.post("api/auth/check-username", body);
  return data;
};
const customisedNotification = (title, message, type = "error") => {
  if (type === "success") {
    return notifications.show({
      title: title,
      message: message,
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.green[6],
          borderColor: theme.colors.green[6],
          "&::before": { backgroundColor: theme.white },
        },
        title: { color: theme.white },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          "&:hover": { backgroundColor: theme.colors.blue[7] },
        },
      }),
    });
  }
  return notifications.show({
    title: title,
    message: message,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.red[6],
        borderColor: theme.colors.red[6],

        "&::before": { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": { backgroundColor: theme.colors.blue[7] },
      },
    }),
  });
};
const validateSession = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const data = await axios.get("api/user/validate-session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export {
  signup,
  login,
  checkUserName,
  customisedNotification,
  validateSession,
};
