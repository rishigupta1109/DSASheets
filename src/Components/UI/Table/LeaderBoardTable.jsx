import { createStyles, Table, Progress, Anchor, Text, Group, ScrollArea, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));



export function LeaderBoardTable({ data }) {
  const { classes, theme } = useStyles();

  const rows = data.map((row) => {
    const totalQuestions = row.questions;
    const completed = (row.completed / totalQuestions) * 100;
    const remaining = (100 - completed);
    return (
      <tr key={row.name}>
        <td>
          <Anchor component="button" fz="sm">
            {row.name}
          </Anchor>
        </td>
        <td>{row.sheet}</td>
        <td>
         
            {row.questions}
         </td>
        <td>{Intl.NumberFormat().format(row.completed)}</td>
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
                color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
              },
              {
                value: remaining,
                color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
              },
            ]}
          />
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
            <th>Sheet Name</th>
            <th>Total Questions</th>
            <th>Completed</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}