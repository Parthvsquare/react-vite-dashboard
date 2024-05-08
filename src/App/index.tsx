import AppRouter from "@/router";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import customTheme from "./theme";
import { createContext, useMemo, useState } from "react";
import { useMediaQuery } from "@mui/material";
import ColorModeContext from "@/store";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...customTheme.palette,
        },
      }),
    [prefersDarkMode, mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
