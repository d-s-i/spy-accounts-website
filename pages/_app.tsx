import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme, responsiveFontSizes  } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

import { API_PORT } from "../api/constants";
import { TypographyColor } from "../utils/constants";

let theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        color: TypographyColor
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: { color: TypographyColor }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {},
      },
    },
  },
  palette: {
    background: {
      default: "#262626",
      paper: "#262626"
    }
  }
});
theme = responsiveFontSizes(theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component apiPort={API_PORT} {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
