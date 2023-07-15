import React, { useContext } from "react";
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
import globalContext from "../Components/Context/GlobalContext";
import { createSheet, customisedNotification } from "../Services";

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
  const { sheets, setSheets, setLoading } = useContext(globalContext);
  const createSheetSubmitHandler = async () => {
    // console.log(form);
    if (form.errors.title || form.errors.description) {
      customisedNotification("error", "Invalid form details");
      return;
    }
    try {
      setLoading(true);
      const res = await createSheet(form.values);

      customisedNotification(
        "success",
        "Sheet created successfully",
        "success"
      );
      form.reset();
      window.location.reload();
      setSheets((prev) => [
        ...prev,
        {
          title: form.values.title,
          description: form.values.description,
          _id: res.data.sheetId,
          completed: 0,
          questions: 0,
          topics: [],
          toRevisit: [],
          completedToday: [],
        },
      ]);
      close();
    } catch (err) {
      customisedNotification("error", "Something went wrong");
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
          placeholder="Description"
          label="Description"
          value={form.values.description}
          onChange={(event) =>
            form.setFieldValue("description", event.currentTarget.value)
          }
          error={form.errors.description && "Invalid description"}
          radius="md"
        />
        <Button
          onClick={() => {
            createSheetSubmitHandler();
          }}
          variant="gradient"
          color="blue"
        >
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
          minHeight: "80vh",
        }}
      >
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Admin
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
          <Button variant="gradient" color="blue" onClick={open}>
            Add Sheet
          </Button>
        </Container>
        <Grid
          sx={{
            width: "100%",
          }}
        >
          {sheets.length > 0 &&
            sheets.map((sheet) => {
              let completed = sheet?.completed || 0;
              return (
                <Grid.Col
                  xxs={9}
                  xs={7}
                  sm={6}
                  md={4}
                  lg={3}
                  span={3}
                  key={sheet._id}
                >
                  <SheetCard
                    link={`${sheet._id}`}
                    total={sheet?.questions}
                    description={sheet.description}
                    title={sheet.title}
                    completed={completed}
                    started={completed > 0}
                  />
                </Grid.Col>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};

export default Admin;
