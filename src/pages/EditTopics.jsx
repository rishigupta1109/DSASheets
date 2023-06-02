import React, { useContext } from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import {
  Button,
  Container,
  Grid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import FormModal from "../Components/UI/Admin/FormModal";
import globalContext from "../Components/Context/GlobalContext";
import { createTopic, customisedNotification, deleteSheet } from "../Services";
import { modals } from "@mantine/modals";
export default function EditTopics() {
  let { sheet_id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const { setSheets, user, sheets } = useContext(globalContext);
  const topics = sheets?.filter((sheet) => sheet._id === sheet_id)[0]?.topics;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) => value.trim().length > 0,
    },
  });
  const createTopicHandler = async () => {
    console.log(form);
    if (form.errors.title) {
      customisedNotification("error", "Invalid form details");
      return;
    }
    try {
      const res = await createTopic(form.values.title, sheet_id);
      customisedNotification(
        "success",
        "Topic created successfully",
        "success"
      );
      form.reset();
      console.log({ res });
      setSheets((prev) => {
        return prev?.map((sheet) => {
          if (sheet?._id === sheet_id) {
            sheet?.topics?.push(res?.data?.data);
          }
          return sheet;
        });
      });
      close();
    } catch (err) {
      customisedNotification("error", "Something went wrong");
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

        <Button onClick={createTopicHandler} variant="gradient" color="blue">
          Submit
        </Button>
      </Stack>
    </form>
  );
  const deleteSheetHandler = async () => {
    try {
      const res = await deleteSheet(sheet_id);
      console.log({ res });
      customisedNotification(
        "success",
        "Sheet deleted successfully",
        "success"
      );
      setSheets((prev) => prev?.filter((sheet) => sheet?._id !== sheet_id));
      navigate("/admin");
    } catch (err) {
      customisedNotification("error", "Something went wrong");
      console.log(err);
    }
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
      }}
    >
      <Title align="center">Edit Topics</Title>
      <FormModal
        title={"Add a New Topic"}
        opened={opened}
        close={close}
        form={formHTML}
      />
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
        <Button
          variant="filled"
          color="red"
          onClick={() => {
            modals.openConfirmModal({
              title: "Are you sure",
              children: (
                <Text size="sm">
                  This action is so important that you are required to confirm
                  it with a modal. Please click one of these buttons to proceed.
                </Text>
              ),
              labels: { confirm: "Confirm", cancel: "Cancel" },
              onCancel: () => console.log("Cancel"),
              onConfirm: () => {
                deleteSheetHandler();
              },
            });
          }}
        >
          Delete Sheet
        </Button>
        <Button variant="gradient" color="blue" onClick={open}>
          Add topic
        </Button>
      </Container>
      <Grid
        sx={{
          width: "100%",
        }}
      >
        {topics?.length > 0 &&
          topics?.map((topic) => {
            const sheet = sheets?.filter((sheet) => sheet._id === sheet_id)[0];
            const completed = sheet?.questions?.filter(
              (question) =>
                question?.isCompleted && question?.topicId?.includes(topic?._id)
            ).length;
            const total = sheet?.questions?.filter((ques) =>
              ques?.topicId?.includes(topic?._id)
            )?.length;
            return (
              <Grid.Col
                key={topic?._id}
                xxs={9}
                xs={7}
                sm={6}
                md={4}
                lg={3}
                span={4}
              >
                <SheetCard
                  link={topic?._id + "/questions"}
                  completed={completed}
                  title={topic?.name}
                  started={completed > 0}
                  total={total}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
