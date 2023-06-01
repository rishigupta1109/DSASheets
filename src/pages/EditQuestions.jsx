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
  deleteTopic,
} from "../Services";
export const EditQuestions = () => {
  const { sheet_id, topic_id } = useParams();
  // console.log(sheet_id, topic_id);
  const { sheets, setSheets } = useContext(globalContext);

  const sheet = sheets?.filter((sheet) => sheet._id === sheet_id)[0];
  const topic = sheet?.topics?.filter((topic) => topic._id === topic_id)[0];
  // console.log(sheet, topic);
  const data = sheet?.questions?.filter((question) =>
    question?.topicId?.includes(topic_id)
  );

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
    let questions = JSON.parse(data);
    console.log(questions);
    if (!Array.isArray(questions)) {
      customisedNotification("error", "Invalid JSON");
      form2.setErrors({ data: "Invalid JSON" });
      return;
    } else if (questions.length === 0) {
      customisedNotification("error", "No questions found");
      form2.setErrors({ data: "No questions found" });
      return;
    }
    let hasError = false;
    questions.forEach((question) => {
      if (!question.title || !question.links || !question.links[0]) {
        hasError = true;
      }
    });
    if (hasError) {
      customisedNotification("error", "Invalid JSON");
      form2.setErrors({ data: "Invalid JSON" });
      return;
    }
    questions = questions.map((question) => {
      return { ...question, topicId: [topic_id] };
    });

    try {
      const res = await createMultipleQuestion(questions);
      console.log(res);
      setSheets((prev) => {
        const newSheets = [...prev];
        const sheetIndex = newSheets.findIndex(
          (sheet) => sheet._id === sheet_id
        );
        newSheets[sheetIndex].questions.push(...res.data.createdQuestions);
        return newSheets;
      });

      customisedNotification(
        "success",
        "Question created successfully",
        "success"
      );
      closeMultiple();
    } catch (err) {
      console.log(err);
    }
  };
  const formHTMLMultiple = (
    <form>
      <Stack>
        <JsonInput
          label="Write in JSON format"
          placeholder="Textarea will autosize to fit the content"
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
      const res = await createQuestion(question);
      console.log(res);
      question.isCompleted = false;
      question.notes = "";
      setSheets((prev) => {
        const newSheets = [...prev];
        const sheetIndex = newSheets.findIndex(
          (sheet) => sheet._id === sheet_id
        );
        newSheets[sheetIndex].questions.push(res.data);
        return newSheets;
      });
      customisedNotification(
        "success",
        "Question created successfully",
        "success"
      );
      close();
    } catch (err) {
      console.log(err);
    }
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
    console.log(question);
    setSelectedQuestion(question);
    open();
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
      onConfirm: () => console.log("Confirmed"),
    });
    console.log(question);
  };
  const deleteTopicHandler = async () => {
    try {
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
      <Title align="center">Edit Questions - Arrays</Title>
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
