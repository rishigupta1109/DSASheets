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
import { useDisclosure } from "@mantine/hooks";
import FormModal from "../Components/UI/Admin/FormModal";
import { useForm } from "@mantine/form";

const Admin = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },

    validate: {
      title: (value) => value.trim().length > 0,
      description: (value) => value.trim().length > 0,
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
        <TextInput
          required
          placeholder="Description"
          label="Description"
          value={form.values.description}
          onChange={(event) =>
            form.setFieldValue("description", event.currentTarget.value)
          }
          error={form.errors.description && "Invalid description"}
          radius="md"
        />
        <Button type="submit" variant="gradient" color="blue">
          Submit
        </Button>
      </Stack>
    </form>
  );
  return (
    <div>
      <FormModal
        title={"Add a new Sheet"}
        opened={opened}
        close={close}
        form={formHTML}
      />
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
        <Title align="center">Admin</Title>
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
          <Button variant="gradient" color="blue" onClick={open}>
            Add Sheet
          </Button>
        </Container>
        <Grid>
          <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
            <SheetCard
              link={"striver"}
              completed={10}
              total={150}
              description={"Striver ki sheet"}
              title={"striver"}
              started={true}
            />
          </Grid.Col>

          <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
            <SheetCard
              link={"striver"}
              completed={10}
              total={150}
              description={"Striver ki sheet"}
              title={"striver"}
              started={true}
            />
          </Grid.Col>

          <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
            <SheetCard
              link={"striver"}
              completed={10}
              total={150}
              description={"Striver ki sheet"}
              title={"striver"}
              started={true}
            />
          </Grid.Col>

          <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
            <SheetCard
              link={"striver"}
              completed={10}
              total={150}
              description={"Striver ki sheet"}
              title={"striver"}
              started={true}
            />
          </Grid.Col>
          <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
            <SheetCard
              link={"striver"}
              completed={10}
              total={150}
              description={"Striver ki sheet"}
              title={"striver"}
              started={true}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Admin;
