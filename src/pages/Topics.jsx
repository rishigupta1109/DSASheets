import React, { useContext } from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import { Container, Grid, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import globalContext from "../Components/Context/GlobalContext";
export default function Topics() {
  let { sheet_id } = useParams();
  const { sheets } = useContext(globalContext);
  const topics = sheets?.filter((sheet) => sheet._id === sheet_id)[0]?.topics;
  // console.log(topics);
  return (
    <Container
      fluid
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Title align="center">Topics</Title>

      <Grid
        sx={{
          width: "100%",
        }}
      >
        {topics?.length > 0 &&
          topics?.map((topic) => {
            const sheet = sheets?.filter((sheet) => sheet._id === sheet_id)[0];
            const completed = sheet?.questions?.filter(
              (question) => question?.isCompleted
            ).length;
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
                  total={sheet?.questions?.length}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
