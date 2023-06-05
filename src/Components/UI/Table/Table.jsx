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

import { keys } from "@mantine/utils";
import { useDisclosure } from "@mantine/hooks";
import CreateNoteModal from "./CreateNoteModal";
import {
  IconBadgeTm,
  IconBrandLeetcode,
  IconCross,
  IconCrossFilled,
  IconEditCircle,
  IconMedicalCrossFilled,
  IconNote,
} from "@tabler/icons-react";
import globalContext from "../../Context/GlobalContext";
import { useParams } from "react-router-dom";
import {
  createNote,
  createProgress,
  customisedNotification,
} from "../../../Services";
const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
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

export default function CustomTable({ questionData, onEdit, onDelete }) {
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
    if (user) {
      try {
        console.log({ id, user, topic_id, sheet_id });
        const res = await createProgress(id, user?.userId, topic_id, sheet_id);
        console.log({ res });
      } catch (e) {
        customisedNotification("Error", "Something went wrong");
      }
    }
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
  };
  useEffect(() => {
    setFilteredData(questionData);
    setData(questionData);
  }, [questionData]);
  console.log({ questionData, filteredData, data });
  const rows = filteredData?.map((item) => {
    return (
      <tr
        key={item?._id}
        className={cx({ [classes.rowSelected]: item?.isCompleted })}
      >
        <td>
          <Checkbox
            checked={item?.isCompleted || false}
            onChange={() => toggleRow(item._id)}
            transitionDuration={1}
            style={{
              "& input": {
                cursor: "pointer",
              },
            }}
          />
        </td>
        <td>{item.title}</td>
        <td>
          {item?.links?.length > 0 &&
            item?.links?.map((link, index) => {
              if (link?.trim()?.length === 0) return;
              return (
                <Anchor
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBrandLeetcode />
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
            {onEdit && <th>Action</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
