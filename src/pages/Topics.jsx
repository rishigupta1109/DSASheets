import React from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import { Container, Grid, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
export default function Topics() {
    let { sheet_id } = useParams();
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

      <Grid>
        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard link={"topic/questions"} completed={5} title={"Array"} started={5} total={25} />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard link={"topic/questions"} completed={5} title={"Array"} started={5} total={25} />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard link={"topic/questions"} completed={5} title={"Array"} started={5} total={25} />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard link={"topic/questions"}  completed={5} title={"Array"} started={5} total={25}/>
        </Grid.Col>
        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard link={"topic/questions"} completed={5} title={"Array"} started={5} total={25} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
