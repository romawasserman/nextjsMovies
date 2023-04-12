import App from 'next/app';
import '../styles/index.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../components/theme";

function MyApp({ Component, pageProps }) {
  const [theme, colorMode] = useMode();
  
  return (
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Component {...pageProps} />;
  </ThemeProvider>
)};

export default MyApp;
