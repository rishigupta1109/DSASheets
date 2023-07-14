import {
  Button,
  Center,
  Container,
  RingProgress,
  SegmentedControl,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import QuestionTable from "../Components/UI/Table/Table";
import { useNavigate, useParams } from "react-router-dom";
import globalContext from "../Components/Context/GlobalContext";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconCheck,
} from "@tabler/icons-react";
import { BackBtn } from "../Components/UI/BackBtn";
import { customisedNotification, getQuestions } from "../Services";

export const Questions = () => {
  const { sheet_id, topic_id } = useParams();
  // console.log(sheet_id, topic_id);
  const { sheets } = useContext(globalContext);
  const [questions, setQuestions] = useState([]);
  const [mode, setMode] = useState("0");
  const [showBookmarked, setShowBookmarked] = useState(false);
  const sheet = sheets?.filter((sheet) => sheet._id === sheet_id)[0];
  const topic = sheet?.topics.filter((topic) => topic._id === topic_id)[0];
  const navigate = useNavigate();
  // console.log(sheet, topic);
  if (sheets?.length > 0 && !topic) {
    navigate("/");
  }
  let data = questions;
  const { user, setLoading } = useContext(globalContext);
  if (mode === "1") {
    data = data?.filter((question) => question?.isCompleted);
    // console.log(data);
    data = data?.filter((ques) => {
      const date = new Date(ques?.completedAt);
      const today = new Date();
      const revisitDays = user?.revisitDays || 0;
      // console.log(
      //   date,
      //   today,
      //   revisitDays,
      //   today.getTime() - date.getTime(),
      //   revisitDays * 24 * 60 * 60 * 1000
      // );
      if (
        today.getTime() - date.getTime() >=
        revisitDays * 24 * 60 * 60 * 1000
      ) {
        return ques;
      }
    });
  }
  // if (!data) return <div>Loading...</div>;
  let completed = data?.filter((question) => question?.isCompleted)?.length;
  if (mode === "1") {
    completed = data?.filter((question) => question?.revisited)?.length;
  }
  if (showBookmarked) {
    data = data?.filter((question) => question?.bookmarked);
    completed = data?.filter((question) => question?.isCompleted)?.length;
    if (mode === "1") {
      completed = data?.filter((question) => question?.revisited)?.length;
    }
  }

  const total = data?.length;
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await getQuestions(topic_id);
        setQuestions(res.data.questions);
        // console.log(res.data.questions);
      } catch (err) {
        console.log(err);
        customisedNotification("error", "Something went wrong");
      }
      setLoading(false);
    };
    fetchQuestions();
    if (window.location.pathname === "/login") {
      navigate("/sheet/" + sheet_id + "/" + topic_id + "/questions");
    }
  }, []);
  const toggleBookmark = async (id) => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question._id === id) {
          return { ...question, bookmarked: !question.bookmarked };
        }
        return question;
      });
    });
  };
  const toggleCompleted = async (id) => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question._id === id) {
          return {
            ...question,
            isCompleted: !question.isCompleted,
            completedAt: new Date(),
          };
        }
        return question;
      });
    });
  };
  const toggleRevisited = async (id) => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question._id === id) {
          return { ...question, revisited: !question.revisited };
        }
        return question;
      });
    });
  };
  const saveNoteHandler = (id, content) => {
    setQuestions((prev) => {
      return prev.map((ques) => {
        if (ques._id === id) {
          return {
            ...ques,
            notes: content,
          };
        }
        return ques;
      });
    });
  };
  return (
    <Container
      fluid
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "relative",
        minHeight: "80vh",
        padding: "1rem",
      }}
    >
      <BackBtn />
      <Title align="center" order={1} italic>
        {" "}
        {topic?.name}
      </Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isNaN(((completed / total) * 100)?.toFixed(0)) &&
          ((completed / total) * 100)?.toFixed(0) != 100 && (
            <RingProgress
              sections={[{ value: (completed / total) * 100, color: "blue" }]}
              label={
                <Text color="blue" weight={700} align="center" size="xl">
                  {((completed / total) * 100)?.toFixed(0)}%
                </Text>
              }
            />
          )}

        {((completed / total) * 100)?.toFixed(0) == 100 && (
          <RingProgress
            sections={[{ value: 100, color: "teal" }]}
            label={
              <Center>
                <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                  <IconCheck size={22} />
                </ThemeIcon>
              </Center>
            }
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "baseline",
            justifyContent: "baseline",
            padding: "1rem 3rem",
            borderRadius: "1rem",
          }}
        >
          {total - completed !== 0 && (
            <Text color="green" align="center" weight={500} italic size="xl">
              {completed} completed
            </Text>
          )}
          {total - completed !== 0 && (
            <Text color="blue" align="center" weight={500} italic size="xl">
              {total - completed} more to go
            </Text>
          )}
          {total !== 0 && total - completed === 0 && (
            <Text color="teal" align="center" weight={500} italic size="xl">
              All Done!
            </Text>
          )}
          {total === 0 && mode === "1" && !showBookmarked && (
            <Text color="blue" align="center" weight={500} italic size="xl">
              No questions to revisit
            </Text>
          )}
          {total === 0 && mode === "0" && !showBookmarked && (
            <Text color="blue" align="center" weight={500} italic size="xl">
              No questions to show
            </Text>
          )}
          {total === 0 && showBookmarked && (
            <Text color="blue" align="center" weight={500} italic size="xl">
              No questions Bookmarked
            </Text>
          )}
        </div>
      </div>
      <div
        style={{
          overflow: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            minWidth: "80vw",

            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "auto",
          }}
        >
          <SegmentedControl
            value={mode}
            onChange={(value) => {
              // console.log(value);
              setMode(value);
            }}
            data={[
              { label: "First visit", value: "0" },
              { label: "Revisit", value: "1" },
            ]}
            sx={{
              margin: "1rem",
              zIndex: 1,
            }}
          />
          <Button
            onClick={() => {
              setShowBookmarked(!showBookmarked);
            }}
            variant={showBookmarked ? "outline" : "gradient"}
            color={showBookmarked ? "blue" : "green"}
            leftIcon={
              showBookmarked ? (
                <IconBookmark size="1rem" />
              ) : (
                <IconBookmarkFilled size="1rem" color="white" />
              )
            }
          >
            {
              <Text
                color={showBookmarked ? "blue" : "white"}
                weight={500}
                align="center"
                size="sm"
              >
                {showBookmarked ? "Show All" : "Show Bookmarked"}
              </Text>
            }
          </Button>
        </div>
        {data.length > 0 && (
          <QuestionTable
            saveNote={saveNoteHandler}
            questionData={data}
            mode={mode}
            toggle={mode === "0" ? toggleCompleted : toggleRevisited}
            toggleBookmarked={toggleBookmark}
          />
        )}
      </div>
    </Container>
  );
};
