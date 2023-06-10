import {
  Center,
  Container,
  RingProgress,
  SegmentedControl,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import QuestionTable from "../Components/UI/Table/Table";
import { useNavigate, useParams } from "react-router-dom";
import globalContext from "../Components/Context/GlobalContext";
import { IconCheck } from "@tabler/icons-react";
import { BackBtn } from "../Components/UI/BackBtn";

export const Questions = () => {
  const { sheet_id, topic_id } = useParams();
  // console.log(sheet_id, topic_id);
  const { sheets } = useContext(globalContext);
  const [mode, setMode] = useState("0");
  const sheet = sheets?.filter((sheet) => sheet._id === sheet_id)[0];
  const topic = sheet?.topics.filter((topic) => topic._id === topic_id)[0];
  const navigate = useNavigate();
  // console.log(sheet, topic);
  if (sheets?.length > 0 && !topic) {
    navigate("/");
  }
  let data = sheet?.questions.filter((question) =>
    question?.topicId?.includes(topic_id)
  );
  const { user } = useContext(globalContext);
  if (mode === "1") {
    data = data?.filter((question) => question?.isCompleted);
    console.log(data);
    data = data?.filter((ques) => {
      const date = new Date(ques?.completedAt);
      const today = new Date();
      const revisitDays = user?.revisitDays || 0;
      // console.log(
      //   date,
      //   today,
      //   revisitDays,
      //   today.getTime() - date.getTime(),
      //   revisitDays * 24 * 60 * 60 * 1000
      // );
      if (
        today.getTime() - date.getTime() >=
        revisitDays * 24 * 60 * 60 * 1000
      ) {
        return ques;
      }
    });
  }
  // if (!data) return <div>Loading...</div>;
  let completed = data?.filter((question) => question?.isCompleted)?.length;
  if (mode === "1") {
    completed = data?.filter((question) => question?.revisited)?.length;
  }
  const total = data?.length;
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
      <Title align="center" order={1} italic>
        {" "}
        {topic?.name}
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
        {!isNaN(((completed / total) * 100)?.toFixed(0)) &&
          ((completed / total) * 100)?.toFixed(0) != 100 && (
            <RingProgress
              sections={[{ value: (completed / total) * 100, color: "blue" }]}
              label={
                <Text color="blue" weight={700} align="center" size="xl">
                  {((completed / total) * 100)?.toFixed(0)}%
                </Text>
              }
            />
          )}

        {((completed / total) * 100)?.toFixed(0) == 100 && (
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
          {total !== 0 && total - completed === 0 && (
            <Text color="teal" align="center" weight={500} italic size="xl">
              All Done!
            </Text>
          )}
          {total === 0 && (
            <Text color="red" align="center" weight={500} italic size="xl">
              No questions to revisit yet
            </Text>
          )}
        </div>
      </div>
      <div>
        <SegmentedControl
          value={mode}
          onChange={(value) => {
            console.log(value);
            setMode(value);
          }}
          data={[
            { label: "First visit", value: "0" },
            { label: "Revisit", value: "1" },
          ]}
          sx={{
            margin: "1rem",
            marginLeft: "auto",
          }}
        />
        <QuestionTable questionData={data} mode={mode} />
      </div>
    </Container>
  );
};
