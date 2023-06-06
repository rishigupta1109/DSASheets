import React, { useContext } from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import {
  Center,
  Container,
  Grid,
  RingProgress,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import globalContext from "../Components/Context/GlobalContext";
import { IconCheck } from "@tabler/icons-react";
import { BackBtn } from "../Components/UI/BackBtn";
export default function Topics() {
  let { sheet_id } = useParams();
  const { sheets } = useContext(globalContext);
  const topics = sheets?.filter((sheet) => sheet._id === sheet_id)[0]?.topics;
  // console.log(topics);
  const completed = sheets
    ?.filter((sheet) => sheet._id === sheet_id)[0]
    ?.questions?.filter((question) => question?.isCompleted)?.length;
  const total = sheets?.filter((sheet) => sheet._id === sheet_id)[0]?.questions
    ?.length;
  return (
    <Container
      fluid
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <BackBtn />
      <Title align="center" italic order={1}>
        {
          sheets.find((sheet) => {
            return sheet._id === sheet_id;
          })?.title
        }
      </Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {((completed / total) * 100).toFixed(0) != 100 && (
          <RingProgress
            sections={[{ value: (completed / total) * 100, color: "blue" }]}
            label={
              <Text color="blue" weight={700} align="center" size="xl">
                {((completed / total) * 100).toFixed(0)}%
              </Text>
            }
          />
        )}

        {((completed / total) * 100).toFixed(0) == 100 && (
          <RingProgress
            sections={[{ value: 100, color: "teal" }]}
            label={
              <Center>
                <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                  <IconCheck size={22} />
                </ThemeIcon>
              </Center>
            }
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "baseline",
            justifyContent: "baseline",
            padding: "1rem 3rem",
            borderRadius: "1rem",
          }}
        >
          {total - completed !== 0 && (
            <Text color="green" align="center" weight={500} italic size="xl">
              {completed} completed
            </Text>
          )}
          {total - completed !== 0 && (
            <Text color="blue" align="center" weight={500} italic size="xl">
              {total - completed} more to go
            </Text>
          )}
          {total - completed === 0 && (
            <Text color="teal" align="center" weight={500} italic size="xl">
              All Done!
            </Text>
          )}
        </div>
      </div>
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
                span={3}
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
