import { PaletteOptions, alpha, getContrastRatio } from "@mui/material/styles";

// Augment the palette to include a violet color
declare module "@mui/material/styles" {
  interface Palette {
    violet: Palette["primary"];
  }

  interface PaletteOptions {
    violet?: PaletteOptions["primary"];
  }
}

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const customTheme: Record<"palette", PaletteOptions> = {
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
};
export default customTheme;
