import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  rem,
  Loader,
} from "@mantine/core";
import { IconUserMinus } from "@tabler/icons-react";
import {
  IconBellPlusFilled,
  IconMoodPlus,
  IconPlus,
  IconUserPlus,
} from "@tabler/icons-react";
import globalContext from "../../Context/GlobalContext";
import { useContext } from "react";
import { customisedNotification, toggleFriend } from "../../../Services";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export function FriendsTable({ data, loading }) {
  const { classes, theme } = useStyles();
  const { user, setUser } = useContext(globalContext);
  const toggleFriendHandler = async (id) => {
    console.log(id);
    try {
      const res = await toggleFriend(user?.userId, id);
      console.log(res);
      if (!user?.friends.includes(id)) {
        setUser((prev) => ({
          ...prev,
          friends: [id, ...prev.friends],
        }));
      } else {
        setUser((prev) => ({
          ...prev,
          friends: prev.friends.filter((f) => f !== id),
        }));
      }
    } catch (err) {
      customisedNotification("error", "Something went wrong");
      console.log(err);
    }
  };
  const rows = data.map((row) => {
    const isFriend = user.friends.includes(row._id);
    return (
      <tr key={row.name}>
        <td>{row.username}</td>
        <td>{row.name}</td>
        <td>
          {!isFriend && (
            <IconUserPlus
              onClick={toggleFriendHandler.bind(null, row._id)}
              style={{ cursor: "pointer" }}
            />
          )}
          {isFriend && (
            <IconUserMinus
              onClick={toggleFriendHandler.bind(null, row._id)}
              style={{ cursor: "pointer" }}
            />
          )}
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
            <th>Action</th>
          </tr>
        </thead>
        {loading && (
          <tr
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <td colSpan={3}>
              <Loader />
            </td>
          </tr>
        )}

        {!loading && <tbody>{rows}</tbody>}
      </Table>
    </ScrollArea>
  );
}
