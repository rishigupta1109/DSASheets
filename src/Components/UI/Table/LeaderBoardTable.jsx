import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  rem,
  Title,
} from "@mantine/core";
import globalContext from "../../Context/GlobalContext";
import { useContext } from "react";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export function LeaderBoardTable({ data, sheet }) {
  const { classes, theme } = useStyles();
  const specificData = !(sheet === "ALL");
  const { sheets } = useContext(globalContext);

  const sheetSelected = sheets.filter((s) => s?._id === sheet);
  console.log({ data, sheets, sheetSelected });
  const rows = data.map((row, index) => {
    const totalQuestions = sheetSelected[0]?.questions;
    const completed = (row.completed / totalQuestions) * 100;
    const remaining = 100 - completed;
    return (
      <tr key={row.name}>
        <td>{index + 1}</td>
        <td>
          <Text fz="sm">{row.username}</Text>
        </td>
        <td>
          <Text fz="sm">{row.name}</Text>
        </td>
        {row?.sheet && <td>{row.sheet}</td>}
        {totalQuestions && <td>{totalQuestions}</td>}
        <td>{Intl.NumberFormat().format(row.completed)}</td>
        {totalQuestions && (
          <td>
            <Group position="apart">
              <Text fz="xs" c="teal" weight={700}>
                {completed.toFixed(0)}%
              </Text>
            </Group>
            <Progress
              classNames={{ bar: classes.progressBar }}
              sections={[
                {
                  value: completed,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.teal[9]
                      : theme.colors.teal[6],
                },
                {
                  value: remaining,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.red[9]
                      : theme.colors.red[6],
                },
              ]}
            />
          </td>
        )}
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User Name</th>
            <th>Name</th>
            {specificData && <th>Sheet Name</th>}
            {specificData && <th>Total Questions</th>}
            <th>Completed</th>
            {specificData && <th>Progress</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
