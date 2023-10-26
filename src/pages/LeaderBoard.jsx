import React, { useContext, useEffect, useState } from "react";
import { Container, SegmentedControl, Select, Title } from "@mantine/core";
import CustomTable from "../Components/UI/Table/Table";
import { LeaderBoardTable } from "../Components/UI/Table/LeaderBoardTable";
import globalContext from "../Components/Context/GlobalContext";
import { getLeaderboard } from "../Services";
import { useNavigate } from "react-router-dom";
import TopPerfromers from "./TopPerfromers";

const LeaderBoard = () => {
  const [sheet, setSheet] = useState("ALL");
  let [pageNumber, setPageNumber] = useState(0);
  let [totalPages, setTotalPages] = useState(1);
  const [duration, setDuration] = useState(1);
  const { colleges } = useContext(globalContext);
  const [withs, setWith] = useState("Friends");
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("0");
  const [loading, setLoading] = useState(false);
  const { sheets, user } = useContext(globalContext);
  const navigate = useNavigate();
  const sheetOptions = sheets.map((sheet) => ({
    label: sheet.title,
    value: sheet._id,
  }));
  sheetOptions.unshift({ label: "ALL", value: "ALL" });
  const sheetSelected = sheets.find((s) => s?._id === sheet);
  const fetchData = async () => {
    if (duration && user && withs) {
      try {
        setLoading(true);
        const res = await getLeaderboard(
          user?.userId,
          sheet,
          duration,
          withs,
          pageNumber
        );
        // console.log(res);
        const data = res?.data?.leaderboard?.map((d) => ({
          ...d,
          sheet: sheetSelected?.title,
          completed: d?.questions,
          questions: sheetSelected?.questions?.length,
        }));
        setTotalPages(parseInt(res?.data?.totalDocs));
        setData(data?.sort((a, b) => b?.completed - a?.completed));
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log(sheet, duration);
    fetchData();
  }, [sheet, duration, withs, user, pageNumber]);

  if (window.location.pathname !== "/leaderboard") {
    navigate("/leaderboard");
  }
  console.log({ totalPages });
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
        minHeight: "80vh",
        padding: "1rem",
      }}
    >
      <Title align="center" order={1} italic>
        <SegmentedControl
          value={mode}
          onChange={(value) => {
            // console.log(value);
            setMode(value);
          }}
          data={[
            { label: "LeaderBoard", value: "0" },
            { label: "Top Performers", value: "1" },
          ]}
          sx={{
            margin: "1rem",
            zIndex: 1,
          }}
        />
      </Title>
      {mode === "1" && <TopPerfromers />}
      {mode === "0" && (
        <>
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
              value={sheet}
              onChange={(event) => {
                setSheet(event);
              }}
            />
            <Select
              label="Duration"
              placeholder="Pick one"
              nothingFound="No options"
              value={duration}
              onChange={(event) => setDuration(event)}
              data={[
                { label: "Today", value: 1 },
                { label: "This Week", value: 7 },
                { label: "This Month", value: 31 },
                { label: "This Year", value: 365 },
                { label: "Overall", value: -1 },
              ]}
            />
            <Select
              label="With"
              placeholder="Pick one"
              nothingFound="No options"
              value={withs}
              onChange={(event) => setWith(event)}
              data={["ALL", "Friends", ...colleges]}
            />
          </Container>
          <LeaderBoardTable
            totalPages={totalPages}
            pageNumber={pageNumber}
            loading={loading}
            sheet={sheet}
            data={data}
            setPageNumber={setPageNumber}
          />
        </>
      )}
    </Container>
  );
};

export default LeaderBoard;
