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

function FormModal({ opened, close, form, title }) {
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
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
          {form}
        </Container>
      </Modal>
    </>
  );
}
export default FormModal;
