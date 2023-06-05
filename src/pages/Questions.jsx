import {
  Center,
  Container,
  RingProgress,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React, { useContext } from "react";
import QuestionTable from "../Components/UI/Table/Table";
import { useParams } from "react-router-dom";
import globalContext from "../Components/Context/GlobalContext";
import { IconCheck } from "@tabler/icons-react";

export const Questions = () => {
  const { sheet_id, topic_id } = useParams();
  // console.log(sheet_id, topic_id);
  const { sheets } = useContext(globalContext);

  const sheet = sheets?.filter((sheet) => sheet._id === sheet_id)[0];
  const topic = sheet?.topics.filter((topic) => topic._id === topic_id)[0];
  // console.log(sheet, topic);
  const data = sheet?.questions.filter((question) =>
    question?.topicId?.includes(topic_id)
  );
  // console.log(data);
  // if (!data) return <div>Loading...</div>;
  const completed = data?.filter((question) => question?.isCompleted)?.length;
  const total = data?.length;
  return (
    <Container
      fluid
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        overflow: "auto",
      }}
    >
      <Title align="center">Questions - {topic?.name}</Title>
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
            backgroundColor: "#add8e66b",
            padding: "1rem 3rem",
            borderRadius: "1rem",
          }}
        >
          <Text color="blue" align="center" weight={700} size="xl">
            Total : {total}
          </Text>
          <Text color="blue" align="center" weight={700} size="xl">
            Completed : {completed}
          </Text>
        </div>
      </div>
      <QuestionTable questionData={data} />
    </Container>
  );
};
