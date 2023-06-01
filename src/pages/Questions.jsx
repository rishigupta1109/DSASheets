import { Container, Title } from "@mantine/core";
import React, { useContext } from "react";
import QuestionTable from "../Components/UI/Table/Table";
import { useParams } from "react-router-dom";
import globalContext from "../Components/Context/GlobalContext";

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
  if (!data) return <div>Loading...</div>;
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
      <QuestionTable questionData={data} />
    </Container>
  );
};
