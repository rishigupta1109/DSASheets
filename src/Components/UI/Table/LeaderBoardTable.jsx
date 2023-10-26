import {
  createStyles,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  rem,
  Title,
  Loader,
} from "@mantine/core";
import globalContext from "../../Context/GlobalContext";
import { useContext } from "react";
import { Table } from "antd";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export function LeaderBoardTable({
  data,
  sheet,
  loading,
  totalPages,
  pageNumber,
  setPageNumber,
}) {
  console.log({ totalPages });
  const { classes, theme } = useStyles();
  const specificData = !(sheet === "ALL");
  const { sheets } = useContext(globalContext);

  const sheetSelected = sheets.filter((s) => s?._id === sheet);
  console.log({ data, sheets, sheetSelected });
  const columns = [
    {
      title: "Rank",
      key: "rank",
      render: (_, row, index) => <p>{pageNumber * 10 + index + 1}</p>,
    },
    {
      title: "User Name",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Completed",
      key: "completed",
      render: (_, row) => {
        console.log(row);
        const totalQuestions = sheetSelected[0]?.questions;
        const completed = (row.completed / totalQuestions) * 100;
        const remaining = 100 - completed;
        return <p>{Intl.NumberFormat().format(row.completed)}</p>;
      },
    },
    {
      title: "Current Streak",
      key: "currentStreak",
      dataIndex: "currentStreak",
    },
    {
      title: "Longest Streak",
      key: "longestStreak",
      dataIndex: "longestStreak",
    },
  ];
  const columnsWithSheets = [
    {
      title: "Rank",
      key: "rank",
      render: (_, row, index) => <p>{pageNumber * 10 + index + 1}</p>,
    },
    {
      title: "User Name",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Sheet Name",
      key: "sheetName",
      render: (row) => {
        return <p>{sheetSelected[0]?.title}</p>;
      },
    },
    {
      title: "Total Questions",
      key: "totalQuestions",
      render: (row) => {
        const totalQuestions = sheetSelected[0]?.questions;
        return <p>{totalQuestions}</p>;
      },
    },
    {
      title: "Completed",
      key: "completed",
      render: (_, row) => {
        console.log(row);
        const totalQuestions = sheetSelected[0]?.questions;
        const completed = (row.completed / totalQuestions) * 100;
        const remaining = 100 - completed;
        return <p>{Intl.NumberFormat().format(row.completed)}</p>;
      },
    },
    {
      title: "Current Streak",
      key: "currentStreak",
      dataIndex: "currentStreak",
    },
    {
      title: "Longest Streak",
      key: "longestStreak",
      dataIndex: "longestStreak",
    },
  ];
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
        {sheetSelected.length > 0 && <td>{sheetSelected[0]?.title}</td>}
        {totalQuestions && <td>{totalQuestions}</td>}
        <td>{Intl.NumberFormat().format(row.completed)}</td>
        <td>{row.currentStreak}</td>
        <td>{row.longestStreak}</td>
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

  // return (
  //   <ScrollArea>
  //     {loading ? (
  //       <Loader />
  //     ) : (
  //       <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
  //         <thead>
  //           <tr>
  //             <th>Rank</th>
  //             <th>User Name</th>
  //             <th>Name</th>
  //             {specificData && <th>Sheet Name</th>}
  //             {specificData && <th>Total Questions</th>}
  //             <th>Completed</th>
  //             <th>Current Streak</th>
  //             <th>Longest Streak</th>
  //             {specificData && <th>Progress</th>}
  //           </tr>
  //         </thead>
  //         <tbody>{rows}</tbody>
  //       </Table>
  //     )}
  //   </ScrollArea>
  // );
  return (
    <Table
      loading={loading}
      style={{
        width: "100%",
      }}
      columns={sheetSelected.length > 0 ? columnsWithSheets : columns}
      dataSource={data}
      pagination={{
        total: totalPages,
        hideOnSinglePage: true,
        pageSize: 10,
        current: pageNumber + 1,
        onChange: (page) => {
          setPageNumber(page - 1);
        },
      }}
    />
  );
}
