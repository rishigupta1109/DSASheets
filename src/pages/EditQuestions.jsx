import {
  Button,
  Container,
  JsonInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import QuestionTable from "../Components/UI/Table/Table";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import FormModal from "../Components/UI/Admin/FormModal";
import { modals } from "@mantine/modals";
export const EditQuestions = () => {
  const data = [
    {
      id: "1",
      title: "Four Sum",
      link1: "Leetcode",
      link2: "GFG",
    },
    {
      id: "2",
      title: "Four Sum",
      link1: "Leetcode",
      link2: "GFG",
    },
    {
      id: "3",
      title: "Four Sum",
      link1: "Leetcode",
      link2: "GFG",
    },
  ];
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
      data: (value) => value.trim().length > 0,
    },
  });
  useEffect(() => {
    form.setValues({
      title: selectedQuestion?.title || "",
      link1: selectedQuestion?.link1 || "",
      link2: selectedQuestion?.link2 || "",
    });
  }, [selectedQuestion]);
  const formHTMLMultiple = (
    <form onSubmit={form.onSubmit(() => {})}>
      <Stack>
        <JsonInput
          label="Write in JSON format"
          placeholder="Textarea will autosize to fit the content"
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
          maxRows={8}
          value={form2.values.data}
        />
        <Button type="submit" variant="gradient" color="blue">
          Submit
        </Button>
      </Stack>
    </form>
  );
  const formHTML = (
    <form onSubmit={form.onSubmit(() => {})}>
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

        <Button type="submit" variant="gradient" color="blue">
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
      onConfirm: () => console.log("Confirmed"),
    });
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
