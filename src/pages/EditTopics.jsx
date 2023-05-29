import React from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import {
  Button,
  Container,
  Grid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import FormModal from "../Components/UI/Admin/FormModal";
export default function EditTopics() {
  let { sheet_id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) => value.trim().length > 0,
    },
  });
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

        <Button type="submit" variant="gradient" color="blue">
          Submit
        </Button>
      </Stack>
    </form>
  );
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
        <Button variant="filled" color="red">
          Delete Sheet
        </Button>
        <Button variant="gradient" color="blue" onClick={open}>
          Add topic
        </Button>
      </Container>
      <Grid>
        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"topic/questions"}
            completed={5}
            title={"Array"}
            started={5}
            total={25}
          />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"topic/questions"}
            completed={5}
            title={"Array"}
            started={5}
            total={25}
          />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"topic/questions"}
            completed={5}
            title={"Array"}
            started={5}
            total={25}
          />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"topic/questions"}
            completed={5}
            title={"Array"}
            started={5}
            total={25}
          />
        </Grid.Col>
        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"topic/questions"}
            completed={5}
            title={"Array"}
            started={5}
            total={25}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
