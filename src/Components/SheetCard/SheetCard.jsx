import {
  Card,
  Avatar,
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
// import { MantineLogo } from "@mantine/ds";
// import { IconUpload } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
export function SheetCard({
  title,
  description,
  completed,
  total,
  started,
  link,
  toRevisit,
}) {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <div
      style={{
        // height: "500px",
        width: "350px",
        cursor: "pointer",
      }}
      onClick={() => navigate(link)}
    >
      <Card
        sx={{
          height: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "baseline",
          backgroundColor: !dark
            ? started
              ? completed === total
                ? "#00ff3e1c"
                : "#add8e661"
              : "white"
            : started
            ? completed === total
              ? "#00ff8936"
              : "#05bdf942"
            : "#2a2a2a",
        }}
        withBorder
        padding="lg"
        radius="md"
        color={started ? (completed === total ? "teal" : "blue") : "gray"}
      >
        <Group position="apart">
          {/* <MantineLogo type="mark" size="2rem" /> */}
          {!started && <Badge>Start Now!</Badge>}
        </Group>
        <Group position="apart">
          {/* <MantineLogo type="mark" size="2rem" /> */}
          {started && completed !== total && (
            <Badge
              bg={"blue"}
              sx={{
                color: "white",
              }}
            >
              Solve Now!
            </Badge>
          )}
          {started && completed === total && (
            <Badge
              bg={"green"}
              sx={{
                color: "white",
              }}
            >
              Well Done!
            </Badge>
          )}
          {toRevisit > 0 && (
            <Badge
              bg={"red"}
              sx={{
                color: "white",
              }}
            >
              {toRevisit} to Revisit!
            </Badge>
          )}
        </Group>

        <Text fz="lg" fw={500} mt="md">
          {title}
        </Text>
        <Text fz="sm" c="dimmed" mt={5}>
          {description}
        </Text>

        {started && (
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
        )}
        {!started && (
          <Text
            c="dimmed"
            fz="sm"
            mt="md"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "2rem",
            }}
          >
            Not Started Yet
            <Text
              span
              fw={500}
              sx={(theme) => ({
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
              })}
            >
              {total || 0} Questions to go{" "}
            </Text>
          </Text>
        )}

        {started && completed !== total && (
          <>
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
              {total - completed} More to go{" "}
              <Text
                span
                fw={500}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark" ? theme.white : theme.black,
                })}
              >
                {((completed / total) * 100).toFixed(0)}% Completed
              </Text>
            </Text>

            <Progress value={(completed / total) * 100} mt={5} />
          </>
        )}
        {/* {toRevisit > 0 && toRevisit !== revisited && (
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
            {toRevisit} Questions to Revisit{" "}
            <Text
              span
              fw={500}
              sx={(theme) => ({
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
              })}
            >
              {((revisited / toRevisit) * 100).toFixed(0)}% Revisited
            </Text>
          </Text>
        )} */}
        {started && completed === total && (
          <>
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
              Well Done!{" "}
              <Text
                span
                fw={500}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark" ? theme.white : theme.black,
                })}
              >
                {((completed / total) * 100).toFixed(0)}% Completed
              </Text>
            </Text>

            <Progress color="green" value={(completed / total) * 100} mt={5} />
          </>
        )}
      </Card>
    </div>
  );
}
