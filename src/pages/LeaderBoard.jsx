import React, { useContext, useEffect, useState } from "react";
import { Container, Select, Title } from "@mantine/core";
import CustomTable from "../Components/UI/Table/Table";
import { LeaderBoardTable } from "../Components/UI/Table/LeaderBoardTable";
import globalContext from "../Components/Context/GlobalContext";
import { getLeaderboard } from "../Services";

const LeaderBoard = () => {
  const [sheet, setSheet] = useState("");
  const [duration, setDuration] = useState("");
  const [data, setData] = useState([]);

  const { sheets, user, setLoading } = useContext(globalContext);
  const sheetOptions = sheets.map((sheet) => ({
    label: sheet.title,
    value: sheet._id,
  }));
  const sheetSelected = sheets.find((s) => s?._id === sheet);
  useEffect(() => {
    console.log(sheet, duration);
    const fetchData = async () => {
      if (sheet && duration && sheet.trim().length > 0) {
        try {
          setLoading(true);
          const res = await getLeaderboard(user?.userId, sheet, duration);
          console.log(res);
          const data = res?.data?.leaderboard?.map((d) => ({
            ...d,
            sheet: sheetSelected?.title,
            completed: d?.questions,
            questions: sheetSelected?.questions?.length,
          }));
          setData(data?.sort((a, b) => b?.completed - a?.completed));
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [sheet, duration]);
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
      <Title align="center" order={1} italic>
        LeaderBoard
      </Title>
      <Container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <Select
          label="Sheet"
          placeholder="Pick one"
          searchable
          nothingFound="No options"
          data={sheetOptions}
          defaultValue={sheetOptions[0]?.label}
          defaultChecked={sheetOptions[0]}
          onChange={(event) => {
            setSheet(event);
          }}
        />
        <Select
          label="Duration"
          placeholder="Pick one"
          nothingFound="No options"
          defaultValue={"Today"}
          defaultChecked={{ label: "Today", value: 0 }}
          onChange={(event) => setDuration(event)}
          data={[
            { label: "Today", value: 1 },
            { label: "This Week", value: 7 },
            { label: "This Month", value: 31 },
          ]}
        />
      </Container>
      <LeaderBoardTable data={data} />
    </Container>
  );
};

export default LeaderBoard;
