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

export function SheetCard() {
  return (
    <div
      style={{
        // height: "500px",
        width: "350px",
      }}
    >
      <Card withBorder padding="lg" radius="md">
        <Group position="apart">
          {/* <MantineLogo type="mark" size="2rem" /> */}
          <Badge>Not Started Yet</Badge>
        </Group>

        <Text fz="lg" fw={500} mt="md">
          Striver Sheet
        </Text>
        <Text fz="sm" c="dimmed" mt={5}>
          A sheet curated by sde Striver to help you ace your coding interviews
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
            23/36
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
          15 More to go{" "}
          <Text
            span
            fw={500}
            sx={(theme) => ({
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            })}
          >
            {((23 / 36) * 100).toFixed(0)}% Completed
          </Text>
        </Text>

        <Progress value={(23 / 36) * 100} mt={5} />
      </Card>
    </div>
  );
}
