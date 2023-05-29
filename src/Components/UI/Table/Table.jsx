import { useState } from "react";
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
  IconBrandLeetcode,
  IconCross,
  IconCrossFilled,
  IconEditCircle,
  IconMedicalCrossFilled,
  IconNote,
} from "@tabler/icons-react";
const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

export default function CustomTable({ questionData, onEdit, onDelete }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedQuestion, setSelectedQuestion] = useState(questionData[0]);
  const { classes, cx } = useStyles();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(questionData);
  const [filteredData, setFilteredData] = useState(questionData);
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const rows = filteredData.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>{item.title}</td>
        <td>
          <Anchor href={item.link1} target="_blank" rel="noreferrer">
            <IconBrandLeetcode />
          </Anchor>
        </td>
        <td>
          <Anchor href={item.link1} target="_blank" rel="noreferrer">
            <IconBrandLeetcode />
          </Anchor>
        </td>
        <td
          onClick={() => {
            open();
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

  return (
    <ScrollArea>
      <CreateNoteModal
        question={selectedQuestion}
        close={close}
        opened={opened}
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
            <th>Link-1</th>
            <th>Link-2</th>
            <th>Note </th>
            {onEdit && <th>Action</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
