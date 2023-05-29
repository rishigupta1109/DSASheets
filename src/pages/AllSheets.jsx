import React from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import { Container, Grid, Title } from "@mantine/core";

export default function AllSheets() {
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

      <Grid>
        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"/striver"}
            completed={10}
            total={150}
            description={"Striver ki sheet"}
            title={"striver"}
            started={true}
          />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"/striver"}
            completed={10}
            total={150}
            description={"Striver ki sheet"}
            title={"striver"}
            started={true}
          />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"/striver"}
            completed={10}
            total={150}
            description={"Striver ki sheet"}
            title={"striver"}
            started={true}
          />
        </Grid.Col>

        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"/striver"}
            completed={10}
            total={150}
            description={"Striver ki sheet"}
            title={"striver"}
            started={true}
          />
        </Grid.Col>
        <Grid.Col xxs={9} xs={7} sm={6} md={4} lg={3} span={3}>
          <SheetCard
            link={"/striver"}
            completed={10}
            total={150}
            description={"Striver ki sheet"}
            title={"striver"}
            started={true}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
