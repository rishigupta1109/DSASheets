import {
  Button,
  Container,
  JsonInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import QuestionTable from "../Components/UI/Table/Table";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import FormModal from "../Components/UI/Admin/FormModal";
import { modals } from "@mantine/modals";
import globalContext from "../Components/Context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  createMultipleQuestion,
  createQuestion,
  customisedNotification,
  deleteQuestion,
  deleteTopic,
  getQuestions,
} from "../Services";
export const EditQuestions = () => {
  const { sheet_id, topic_id } = useParams();
  // console.log(sheet_id, topic_id);
  const { sheets, setSheets, setLoading } = useContext(globalContext);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await getQuestions(topic_id);
        setQuestions(res.data.questions);
        // console.log(res.data.questions);
      } catch (err) {
        console.log(err);
        customisedNotification("error", "Something went wrong");
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);
  // console.log(sheet, topic);
  const data = questions;

  const navigate = useNavigate();
  // console.log(data);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedMultiple, { open: openMultiple, close: closeMultiple }] =
    useDisclosure(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const form = useForm({
    initialValues: {
      title: selectedQuestion?.title || "",
      link1: selectedQuestion?.link1 || "",
      link2: selectedQuestion?.link2 || "",
    },

    validate: {
      title: (value) => value.trim().length > 0,
      link1: (value) => value.trim().length > 0,
      link2: (value) => value.trim().length > 0,
    },
  });
  const form2 = useForm({
    initialValues: {
      data: "",
    },

    validate: {
      data: (value) => {
        try {
          const questions = JSON.parse(value);
          if (Array.isArray(questions)) return true;
          return false;
        } catch (err) {
          return false;
        }
      },
    },
  });
  useEffect(() => {
    form.setValues({
      title: selectedQuestion?.title || "",
      link1: selectedQuestion?.link1 || "",
      link2: selectedQuestion?.link2 || "",
    });
  }, [selectedQuestion, sheets]);
  const createMultipleQuestionsHandler = async () => {
    const { data } = form2.values;
    let ques;
    try {
      ques = JSON.parse(data);
    } catch (err) {
      console.log(err);
      return customisedNotification("error", "Invalid JSON");
    }
    // console.log(ques);
    if (!Array.isArray(ques)) {
      customisedNotification("error", "Invalid JSON");
      form2.setErrors({ data: "Invalid JSON" });
      return;
    } else if (ques.length === 0) {
      customisedNotification("error", "No ques found");
      form2.setErrors({ data: "No ques found" });
      return;
    }
    let hasError = false;
    ques.forEach((question) => {
      if (!question.title || !question.links || !question.links[0]) {
        hasError = true;
      }
    });
    if (hasError) {
      customisedNotification("error", "Invalid JSON");
      form2.setErrors({ data: "Invalid JSON" });
      return;
    }
    ques = ques.map((question) => {
      return { ...question, topicId: [topic_id] };
    });

    try {
      setLoading(true);
      const res = await createMultipleQuestion(ques);
      // console.log(res);
      setQuestions((prev) => [...prev, ...ques]);

      customisedNotification(
        "success",
        "Question created successfully",
        "success"
      );
      closeMultiple();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const formHTMLMultiple = (
    <form>
      <Stack>
        <JsonInput
          label="Write in JSON format"
          placeholder="Format : [{'title': 'title', 'links': ['link1', 'link2']}]"
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
          maxRows={8}
          error={form2.errors.data && "Invalid JSON"}
          onChange={(event) => {
            form2.setValues({ data: event });
          }}
          value={form2.values.data}
        />
        <Button
          onClick={createMultipleQuestionsHandler}
          variant="gradient"
          color="blue"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );

  const createQuestionHandler = async () => {
    const { title, link1, link2 } = form.values;

    const question = {
      title,
      links: [link1, link2],
      topicId: [topic_id],
    };
    try {
      setLoading(true);
      const res = await createQuestion(question);
      // console.log(res);
      question.isCompleted = false;
      question.notes = "";
      question._id = res.data.questionId;
      window.location.reload();
      setQuestions((prev) => [...prev, question]);
      customisedNotification(
        "success",
        "Question created successfully",
        "success"
      );
      close();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const formHTML = (
    <form>
      <Stack>
        <TextInput
          required
          placeholder="Title"
          label="Title"
          value={form.values.title}
          onChange={(event) =>
            form.setFieldValue("title", event.currentTarget.value)
          }
          error={form.errors.title && "Invalid title"}
          radius="md"
        />
        <TextInput
          required
          placeholder="Link 1"
          label="Link 1"
          value={form.values.link1}
          onChange={(event) =>
            form.setFieldValue("link1", event.currentTarget.value)
          }
          error={form.errors.title && "Invalid link1"}
          radius="md"
        />
        <TextInput
          placeholder="Link 2"
          label="Link 2"
          value={form.values.link2}
          onChange={(event) =>
            form.setFieldValue("link2", event.currentTarget.value)
          }
          error={form.errors.title && "Invalid link2"}
          radius="md"
        />

        <Button onClick={createQuestionHandler} variant="gradient" color="blue">
          Submit
        </Button>
      </Stack>
    </form>
  );
  const handleClose = () => {
    close();
    form.reset();
    setSelectedQuestion(null);
  };

  const editHandler = (question) => {
    // console.log(question);
    setSelectedQuestion(question);
    open();
  };
  const deleteQuestionHandler = async (question) => {
    try {
      setLoading(true);
      const res = await deleteQuestion(question._id, topic_id);
      // console.log(res);
      setQuestions((prev) => {
        const newQuestions = [...prev];
        const index = newQuestions.findIndex(
          (ques) => ques._id === question._id
        );
        newQuestions.splice(index, 1);
        return newQuestions;
      });
      customisedNotification(
        "success",
        "Question Deleted Successfully",
        "success"
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const deleteHandler = (question) => {
    modals.openConfirmModal({
      title: "Are you sure",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteQuestionHandler(question),
    });
    console.log(question);
  };
  const deleteTopicHandler = async () => {
    try {
      setLoading(true);
      const res = await deleteTopic(topic_id);
      console.log(res);
      setSheets((prev) => {
        const newSheets = [...prev];
        const sheetIndex = newSheets.findIndex(
          (sheet) => sheet._id === sheet_id
        );
        const newTopics = [...newSheets[sheetIndex].topics];
        const topicIndex = newTopics.findIndex(
          (topic) => topic._id === topic_id
        );
        newTopics.splice(topicIndex, 1);
        newSheets[sheetIndex].topics = newTopics;
        return newSheets;
      });
      customisedNotification(
        "success",
        "Topic Deleted Successfully",
        "success"
      );
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const openDeleteConfirm = () => {
    return modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deleteTopicHandler();
      },
    });
  };
  // if (!data) return <div>Loading...</div>;

  const addQuestionHandler = (questions) => {
    setQuestions((prev) => [...prev, ...questions]);
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
      <FormModal
        title={"Add a New Question"}
        opened={opened}
        close={handleClose}
        form={formHTML}
      />
      <FormModal
        title={"Add Multiple Questions"}
        opened={openedMultiple}
        close={closeMultiple}
        form={formHTMLMultiple}
      />
      <Title align="center">
        Edit Questions -{" "}
        {sheets?.topics?.find((topic) => topic._id === topic_id)?.name}
      </Title>
      <Container
        size={"xl"}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="filled" color="red" onClick={openDeleteConfirm}>
          Delete Topic
        </Button>
        <Button variant="gradient" color="blue" onClick={open}>
          Add one Question
        </Button>

        <Button variant="gradient" color="blue" onClick={openMultiple}>
          Add multiple Question
        </Button>
      </Container>
      <QuestionTable
        questionData={data}
        onEdit={editHandler}
        onDelete={deleteHandler}
      />
    </Container>
  );
};
