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
const createSheet = async (body) => {
  //body={title,description}
  const token = localStorage.getItem("token");
  const data = await axios.post("api/data/sheets/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const deleteSheet = async (sheetId) => {
  const token = localStorage.getItem("token");
  const data = await axios.delete("api/data/sheets/" + sheetId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const getSheet = async (userId) => {
  console.log({ userId });
  const data = await axios.get("api/data/sheets/", {
    params: {
      userId: userId,
    },
  });
  return data;
};
const createTopic = async (name, sheetId) => {
  //body={name,sheetId}
  const token = localStorage.getItem("token");
  const data = await axios.post(
    "api/data/topics/",
    {
      name: name,
      sheetId: sheetId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
const deleteTopic = async (topicId) => {
  const token = localStorage.getItem("token");
  const data = await axios.delete("api/data/topics/" + topicId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const getTopic = async (sheetId) => {
  const data = await axios.get("api/data/topic/" + sheetId);
  return data;
};
const createQuestion = async (body) => {
  //body={title,links:[],topicId:[]}
  const token = localStorage.getItem("token");
  const data = await axios.post("api/data/questions/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const getQuestions = async (topicId, userId) => {
  const data = await axios.get("api/data/question/", {
    params: {
      topicId: topicId,
      userId: userId,
    },
  });
  return data;
};
const createMultipleQuestion = async (questions) => {
  //body={questions,topicId}
  const token = localStorage.getItem("token");
  const data = await axios.post(
    "api/data/multiple-questions/",
    {
      questions: questions,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
const createNote = async (questionId, userId, content, topicId) => {
  const token = localStorage.getItem("token");
  const data = await axios.post(
    "api/data/note/",
    {
      questionId: questionId,
      userId: userId,
      content: content,
      topicId: topicId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
const createProgress = async (questionId, userId, topicId, sheetId) => {
  const token = localStorage.getItem("token");
  const data = await axios.post(
    "api/data/progress/",
    {
      questionId: questionId,
      userId: userId,
      topicId: topicId,
      sheetId: sheetId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export {
  createProgress,
  createNote,
  signup,
  login,
  checkUserName,
  customisedNotification,
  validateSession,
  createSheet,
  getSheet,
  createTopic,
  getTopic,
  createQuestion,
  getQuestions,
  createMultipleQuestion,
  deleteSheet,
  deleteTopic,
};
