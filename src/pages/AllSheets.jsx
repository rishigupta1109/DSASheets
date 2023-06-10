import React, { useContext, useEffect, useState } from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import { Container, Grid, Title } from "@mantine/core";
import { getSheet } from "../Services";
import globalContext from "../Components/Context/GlobalContext";

export default function AllSheets() {
  const { sheets, user } = useContext(globalContext);
  sheets?.sort((a, b) => {
    let starteda = 0,
      startedb = 0;
    starteda =
      a?.questions?.filter((question) => question.isCompleted)?.length > 0 || 0;
    startedb =
      b?.questions?.filter((question) => question.isCompleted)?.length > 0 || 0;
    return startedb - starteda;
  });
  // console.log(sheets);
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
      <Title align="center" order={1} italic>
        AllSheets
      </Title>

      <Grid
        sx={{
          width: "100%",
        }}
      >
        {sheets?.length > 0 &&
          sheets?.map((sheet) => {
            let completed =
              sheet?.questions?.filter((question) => question.isCompleted)
                ?.length || 0;
            const toRevisit = sheet?.questions?.filter((ques) => {
              if (!ques?.isCompleted) return false;
              const date = new Date(ques?.completedAt);
              const today = new Date();
              const revisitDays = user?.revisitDays || 0;

              if (
                today.getTime() - date.getTime() >=
                revisitDays * 24 * 60 * 60 * 1000
              ) {
                return ques;
              }
            });
            const revisited = sheet?.questions?.filter(
              (question) => question.revisited && question.isCompleted
            )?.length;
            return (
              <Grid.Col
                xxs={9}
                xs={7}
                sm={6}
                md={5}
                lg={4}
                xl={3}
                span={4}
                key={sheet._id}
              >
                <SheetCard
                  link={`/${sheet._id}`}
                  total={sheet?.questions?.length}
                  description={sheet?.description}
                  title={sheet?.title}
                  completed={completed}
                  started={completed > 0}
                  toRevisit={toRevisit?.length}
                  revisited={revisited}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
