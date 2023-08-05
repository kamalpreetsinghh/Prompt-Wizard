import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ed640d80",
      contrastText: "black",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ed640d80",
      contrastText: "white",
    },
  },
});

export { lightTheme, darkTheme };
