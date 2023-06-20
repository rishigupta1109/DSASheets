import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
export function SegmentedToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  // return (
  //   <Group position="center" my="xl">
  //     <SegmentedControl
  //       value={colorScheme}
  //       onChange={(value) => toggleColorScheme(value)}
  //       data={[
  //         {
  //           value: 'light',
  //           label: (
  //             <Center>
  //               <IconSun size="1rem" stroke={1.5} />
  //               <Box ml={10}>Light</Box>
  //             </Center>
  //           ),
  //         },
  //         {
  //           value: 'dark',
  //           label: (
  //             <Center>
  //               <IconMoon size="1rem" stroke={1.5} />
  //               <Box ml={10}>Dark</Box>
  //             </Center>
  //           ),
  //         },
  //       ]}
  //     />
  //   </Group>
  // );
  return (
    <Group position="center" my={30}>
      <Switch
        checked={colorScheme === "dark"}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={
          <IconSun
            style={{
              cursor: "pointer",
            }}
            color={theme.white}
            size="1.25rem"
            stroke={1.5}
          />
        }
        offLabel={
          <IconMoonStars
            style={{
              cursor: "pointer",
            }}
            color={theme.colors.gray[6]}
            size="1.25rem"
            stroke={1.5}
          />
        }
        sx={{
          cursor: "pointer",
        }}
      />
    </Group>
  );
}
