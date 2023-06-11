import { Loader, useMantineColorScheme } from "@mantine/core";

function CustomLoader() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        background: dark ? "#1A1B1E" : "white",
      }}
    >
      <Loader size="xl" variant="bars" />
    </div>
  );
}

export default CustomLoader;
