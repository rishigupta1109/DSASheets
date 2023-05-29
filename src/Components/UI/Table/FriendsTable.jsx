import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  rem,
} from "@mantine/core";
import { IconUserMinus } from "@tabler/icons-react";
import {
  IconBellPlusFilled,
  IconMoodPlus,
  IconPlus,
  IconUserPlus,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export function FriendsTable({ data }) {
  const { classes, theme } = useStyles();

  const rows = data.map((row) => {
    return (
      <tr key={row.name}>
        <td>{row.username}</td>
        <td>{row.name}</td>

        <td>{row.sheets}</td>
        <td>{Intl.NumberFormat().format(row.completed)}</td>
        <td>
          <IconUserPlus style={{ cursor: "pointer" }} />
          <IconUserMinus style={{ cursor: "pointer" }} />
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Name</th>
            <th>Total Sheets</th>
            <th>Completed Question</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
