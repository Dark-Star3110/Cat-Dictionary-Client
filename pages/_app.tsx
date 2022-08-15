import "../styles/globals.css";
import type { AppProps } from "next/app";
import ToastContextProvider from "../contexts/ToastContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UserContextProvider from "../contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <UserContextProvider>
                <ToastContextProvider>
                    <ToastContainer />
                    <Component {...pageProps} />
                </ToastContextProvider>
            </UserContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
