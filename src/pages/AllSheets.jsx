import React, { useContext, useEffect, useState } from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import { Container, Grid, Title } from "@mantine/core";
import { getSheet } from "../Services";
import globalContext from "../Components/Context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function AllSheets() {
  const { sheets, user } = useContext(globalContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/login") {
      navigate("/allsheets");
    }
  }, [user]);
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
        minHeight: "80vh",
      }}
    >
      <Title
        align="center"
        order={1}
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        All Sheets
      </Title>

      <Grid
        sx={{
          width: "100%",

          "@media (max-width: 700px) and (min-width:500px)": {
            justifyContent: "center",
          },
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
                md={4.5}
                lg={3.5}
                xl={3}
                span={3}
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
