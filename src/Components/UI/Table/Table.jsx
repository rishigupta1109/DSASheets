import { useContext, useEffect, useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  rem,
  TextInput,
  Anchor,
} from "@mantine/core";
import leetcode from "../../../Images/LeetCode_logo_black.png";
import CN from "../../../Images/download-removebg-preview.png";
import gfg from "../../../Images/gfg_200x200-min.png";
import spoj from "../../../Images/B1rm7i-y_400x400-removebg-preview.png";
import { keys } from "@mantine/utils";
import { useDisclosure } from "@mantine/hooks";
import CreateNoteModal from "./CreateNoteModal";
import {
  IconBadgeTm,
  IconBookmark,
  IconBookmarkFilled,
  IconBrandLeetcode,
  IconCross,
  IconCrossFilled,
  IconEditCircle,
  IconLink,
  IconMedicalCrossFilled,
  IconNote,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconStarOff,
} from "@tabler/icons-react";
import globalContext from "../../Context/GlobalContext";
import { useParams } from "react-router-dom";
import {
  createNote,
  createProgress,
  customisedNotification,
  toggleBookmark,
  toggleRevisited,
} from "../../../Services";
const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors["green"][5], 0.2)
        : theme.colors["green"][0],
  },
}));

function filterData(data, search) {
  const query = search?.toLowerCase().trim();
  console.log({ data });
  return data?.filter((item) =>
    keys(data[0])?.some((key) =>
      String(item[key])?.toLowerCase()?.includes(query)
    )
  );
}

export default function CustomTable({ questionData, onEdit, onDelete, mode }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const { classes, cx } = useStyles();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(questionData);
  const [filteredData, setFilteredData] = useState(
    questionData?.sort((a, b) => a?.isCompleted - b?.isCompleted)
  );
  const [selection, setSelection] = useState(["1"]);
  const { sheets, setSheets, user } = useContext(globalContext);
  const { topic_id, sheet_id } = useParams();
  const toggleRow = async (id) => {
    console.log({ id });
    if (!user)
      return customisedNotification(
        "Error",
        "Please login to continue",
        "warning"
      );
    if (user) {
      const newSheets = sheets.map((sheet) => {
        if (sheet?._id === sheet_id) {
          const newQuestions = sheet?.questions?.map((question) => {
            if (question?._id === id) {
              return {
                ...question,
                isCompleted: !question?.isCompleted,
                completedAt: new Date(),
              };
            }
            return question;
          });
          return {
            ...sheet,
            questions: newQuestions,
          };
        }

        return sheet;
      });
      setSheets(newSheets);
      try {
        console.log({ id, user, topic_id, sheet_id });
        const res = await createProgress(id, user?.userId, topic_id, sheet_id);
        console.log({ res });
      } catch (e) {
        const newSheets = sheets.map((sheet) => {
          if (sheet?._id === sheet_id) {
            const newQuestions = sheet?.questions?.map((question) => {
              if (question?._id === id) {
                return {
                  ...question,
                  isCompleted: !question.isCompleted,
                };
              }
              return question;
            });
            return {
              ...sheet,
              questions: newQuestions,
            };
          }

          return sheet;
        });
        setSheets(newSheets);
        customisedNotification("Error", "Something went wrong");
      }
    }
  };
  const toggleRevisitedHandler = async (id) => {
    console.log({ id });
    if (!user)
      return customisedNotification(
        "Error",
        "Please login to continue",
        "warning"
      );
    if (user) {
      const newSheets = sheets?.map((sheet) => {
        if (sheet?._id === sheet_id) {
          const newQuestions = sheet?.questions?.map((question) => {
            if (question?._id === id) {
              if (question?.revisited === undefined) question.revisited = false;
              return {
                ...question,
                revisited: !question?.revisited,
              };
            }
            return question;
          });
          return {
            ...sheet,
            questions: newQuestions,
          };
        }

        return sheet;
      });
      setSheets(newSheets);
      try {
        console.log({ id, user, topic_id, sheet_id });
        const res = await toggleRevisited(id, user?.userId, topic_id, sheet_id);
        console.log({ res });
      } catch (e) {
        const newSheets = sheets?.map((sheet) => {
          if (sheet?._id === sheet_id) {
            const newQuestions = sheet?.questions?.map((question) => {
              if (question?._id === id) {
                return {
                  ...question,
                  isRevisited: !question?.isRevisited,
                };
              }
              return question;
            });
            return {
              ...sheet,
              questions: newQuestions,
            };
          }

          return sheet;
        });
        setSheets(newSheets);
        customisedNotification("Error", "Something went wrong");
      }
    }
  };

  useEffect(() => {
    setFilteredData(questionData);
    setData(questionData);
  }, [questionData]);
  console.log({ questionData, filteredData, data });
  const getLinkType = (link) => {
    if (link?.includes("leetcode")) {
      return <img src={leetcode} height={30} />;
    } else if (link?.includes("geeksforgeeks")) {
      return <img src={gfg} height={30} />;
    } else if (link?.includes("codingninjas")) {
      return <img src={CN} height={30} />;
    } else if (link?.includes("spoj")) {
      return <img src={spoj} height={30} />;
    }
    return <IconLink height={30} />;
  };
  const toggleBookmarkHandler = async (id) => {
    try {
      const mod = sheets?.map((sheet) => {
        if (sheet?._id === sheet_id) {
          const newQuestions = sheet?.questions?.map((question) => {
            if (question?._id === id) {
              return {
                ...question,
                bookmarked: !question?.bookmarked,
              };
            }
            return question;
          });
          return {
            ...sheet,
            questions: newQuestions,
          };
        }

        return sheet;
      });
      setSheets(mod);
      const res = await toggleBookmark(id, user?.userId, topic_id, sheet_id);
      console.log({ res });
    } catch (err) {
      console.log({ err });
      const mod = sheets?.map((sheet) => {
        if (sheet?._id === sheet_id) {
          const newQuestions = sheet?.questions?.map((question) => {
            if (question?._id === id) {
              return {
                ...question,
                bookmarked: !question?.bookmarked,
              };
            }
            return question;
          });
          return {
            ...sheet,
            questions: newQuestions,
          };
        }

        return sheet;
      });
      setSheets(mod);
      customisedNotification("Error", "Something went wrong");
    }
  };
  const rows = filteredData?.map((item) => {
    return (
      <tr
        key={item?._id}
        className={cx({
          [classes.rowSelected]:
            mode === "0" ? item?.isCompleted : item?.revisited,
        })}
      >
        <td>
          <Checkbox
            checked={
              mode === "0"
                ? item?.isCompleted || false
                : item?.revisited || false
            }
            onChange={() => {
              if (mode === "0") toggleRow(item._id);
              else toggleRevisitedHandler(item._id);
            }}
            transitionDuration={1}
            style={{
              "& input": {
                cursor: "pointer",
              },
            }}
          />
        </td>
        <td>{item?.title}</td>
        <td
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item?.links?.length > 0 &&
            item?.links?.map((link, index) => {
              if (link?.trim()?.length === 0) return;
              if (link === "#") return;
              return (
                <Anchor
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getLinkType(link)}
                  {/* <IconBrandLeetcode /> */}
                </Anchor>
              );
            })}
        </td>

        <td
          onClick={() => {
            open();
            console.log({ item });
            setSelectedQuestion(item);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <IconNote />
        </td>
        <td>
          {!item?.bookmarked && (
            <IconBookmark
              onClick={() => {
                toggleBookmarkHandler(item?._id);
              }}
              style={{
                cursor: "pointer",
              }}
            />
          )}
          {item?.bookmarked && (
            <IconBookmarkFilled
              onClick={() => {
                toggleBookmarkHandler(item?._id);
              }}
              style={{
                cursor: "pointer",
              }}
            />
          )}
        </td>
        {onEdit && (
          <td>
            <IconEditCircle
              style={{ cursor: "pointer" }}
              onClick={() => {
                onEdit(item);
              }}
            />
            <IconMedicalCrossFilled
              style={{ cursor: "pointer" }}
              onClick={() => {
                onDelete(item);
              }}
            />
          </td>
        )}
      </tr>
    );
  });
  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setFilteredData(filterData(data, value));
  };
  console.log({ user });
  const onSaveHandler = async (note, questionId) => {
    console.log({ user });
    if (user) {
      try {
        const res = await createNote(questionId, user?.userId, note, topic_id);
        console.log({ res });
        customisedNotification("Success", res?.data?.message, "success");
      } catch (err) {
        console.log({ err });
        customisedNotification("Error", "Something went wrong");
        return;
      }
    }
    const newSheets = sheets.map((sheet) => {
      if (sheet._id === sheet_id) {
        const newQuestions = sheet.questions.map((question) => {
          if (question._id === questionId) {
            return {
              ...question,
              notes: note,
            };
          }
          return question;
        });
        return {
          ...sheet,
          questions: newQuestions,
        };
      }

      return sheet;
    });
    setSheets(newSheets);
  };

  return (
    <ScrollArea>
      <CreateNoteModal
        question={selectedQuestion}
        close={close}
        opened={opened}
        onSave={onSaveHandler}
      />
      <TextInput
        placeholder="Search by any field"
        mb="md"
        // icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              {/* <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              /> */}
            </th>
            <th>Question</th>
            <th>Links</th>
            <th>Note </th>
            <th>Bookmark</th>
            {onEdit && <th>Action</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
