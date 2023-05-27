import "./App.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Layout from "./Components/UI/Layout/Layout";
import Home from "./pages/Home";
function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  return (
    <div>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            breakpoints: {
              xs: 0,
              sm: 768,
              md: 992,
              lg: 1200,
              xl: 1440,
              xxl: 1920,
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Layout>
            <Home />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
