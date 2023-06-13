import React, { useContext, useEffect } from "react";
import { SheetCard } from "../Components/SheetCard/SheetCard";
import { Button, Container, Grid, Title } from "@mantine/core";
import globalContext from "../Components/Context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { sheets, user } = useContext(globalContext);
  const startedSheets = sheets.filter((sheet) => {
    return sheet?.completed > 0;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/login") {
      navigate("/");
    }
  }, []);
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
      <Title align="center" order={1} italic>
        Home
      </Title>

      <Grid
        sx={{
          width: "100%",
        }}
      >
        {startedSheets.length === 0 && (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
              height: "100%",
              minHeight: "60vh",
            }}
          >
            <Title align="center" order={2}>
              No sheets Started Yet
            </Title>
            <Title align="center" size={"xs"}>
              <Button>
                <Link
                  to={"/allsheets"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Start Now
                </Link>
              </Button>
            </Title>
          </Container>
        )}
        {startedSheets.length > 0 &&
          startedSheets.map((sheet) => {
            let completed = sheet?.completed || 0;
            const toRevisit = sheet?.toRevisit?.length;

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
                  link={`/sheet/${sheet._id}`}
                  total={sheet?.questions}
                  description={sheet.description}
                  title={sheet.title}
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
