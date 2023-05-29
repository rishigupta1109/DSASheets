import {
  Card,
  Avatar,
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
} from "@mantine/core";
// import { MantineLogo } from "@mantine/ds";
// import { IconUpload } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
export function SheetCard({
  title ,
  description ,
  completed ,
  total ,
  started,
  link
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        // height: "500px",
        width: "350px",
        cursor: "pointer",
      }}
      onClick={() => navigate(link)}
    >
      <Card withBorder padding="lg" radius="md">
        <Group position="apart">
          {/* <MantineLogo type="mark" size="2rem" /> */}
          {!started&&<Badge>Not Started Yet</Badge>}
        </Group>

        <Text fz="lg" fw={500} mt="md">
          {title}
        </Text>
        <Text fz="sm" c="dimmed" mt={5}>
          {description}
        </Text>

        <Text c="dimmed" fz="sm" mt="md">
          Questions completed:{" "}
          <Text
            span
            fw={500}
            sx={(theme) => ({
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            })}
          >
            {completed}/{total}
          </Text>
        </Text>
        <Text
          c="dimmed"
          fz="sm"
          mt="md"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {total-completed}  More to go{" "}
          <Text
            span
            fw={500}
            sx={(theme) => ({
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            })}
          >
            {((completed/total) * 100).toFixed(0)}% Completed
          </Text>
        </Text>

        <Progress value={(completed/total) * 100} mt={5} />
      </Card>
    </div>
  );
}
