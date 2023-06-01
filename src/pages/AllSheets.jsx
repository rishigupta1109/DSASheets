import React, { useContext, useEffect, useState } from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import { Container, Grid, Title } from "@mantine/core";
import { getSheet } from "../Services";
import globalContext from "../Components/Context/GlobalContext";

export default function AllSheets() {
  const { sheets } = useContext(globalContext);

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
      <Title align="center">AllSheets</Title>

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
            return (
              <Grid.Col
                xxs={9}
                xs={7}
                sm={6}
                md={4}
                lg={3}
                span={3}
                key={sheet._id}
              >
                <SheetCard
                  link={`/${sheet._id}`}
                  total={sheet?.questions?.length}
                  description={sheet?.description}
                  title={sheet?.title}
                  completed={completed}
                  started={completed > 0}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
