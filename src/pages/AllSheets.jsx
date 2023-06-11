import React, { useContext, useEffect, useState } from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import { Container, Grid, Title } from "@mantine/core";
import { getSheet } from "../Services";
import globalContext from "../Components/Context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function AllSheets() {
  const { sheets, user } = useContext(globalContext);
  const navigate = useNavigate();
  if (window.location.pathname !== "/allsheets") {
    navigate("/allsheets");
  }
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

        padding: "1rem",
        minHeight: "62vh",
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
            let completed = sheet?.completed || 0;
            const toRevisit = sheet?.toRevisit?.length;
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
                  link={`/sheet/${sheet._id}`}
                  total={sheet?.questions}
                  description={sheet?.description}
                  title={sheet?.title}
                  completed={completed}
                  started={completed > 0}
                  toRevisit={toRevisit}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
