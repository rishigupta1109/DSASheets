import { Loader } from "@mantine/core";

function CustomLoader() {
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
        background: "white",
      }}
    >
      <Loader size="xl" variant="bars" />
    </div>
  );
}

export default CustomLoader;
