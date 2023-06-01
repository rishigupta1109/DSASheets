import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Group,
  Button,
  TextInput,
  Title,
  useMantineTheme,
  Textarea,
  Container,
} from "@mantine/core";
import { useEffect, useState } from "react";

function CreateNoteModal({ opened, close, question, onSave }) {
  const theme = useMantineTheme();
  const [value, setValue] = useState(question?.notes || "");

  useEffect(() => {
    setValue(question?.notes || "");
  }, [question]);
  // console.log(question);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Notes"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Title order={3}>{question?.title}</Title>
          <Textarea
            placeholder="Write here.."
            // label="Notes"
            autosize
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            minRows={5}
          />
          <Group>
            <Button
              variant="gradient"
              onClick={() => {
                onSave(value, question?._id);
                close();
              }}
            >
              Save
            </Button>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
          </Group>
        </Container>
      </Modal>
    </>
  );
}
export default CreateNoteModal;
