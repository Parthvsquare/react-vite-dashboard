import {
  PaletteOptions,
  ThemeOptions,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const customPalette: Record<"palette", PaletteOptions> = {
  palette: {
    primary: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
    secondary: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
  },
};

const customTheme: ThemeOptions = {
  typography: {
    fontFamily: "Inter",
  },
};

export { customPalette, customTheme };
