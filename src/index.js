import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import ErrorBoundary from './app/common/ErrorBoundary';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#800000',
            light: '#FFFFFF',
            dark: '#000000',
        },
        secondary: {
            main: '#C0C0C0',
        },
        info: {
            main: '#800000',
        },
    },
    typography: {
        allVariants: {
            fontFamily: `"Barlow", "Baloo", sans-serif`,
            textTransform: 'none',
        },
    },
});

ReactDOM.render(
    <ErrorBoundary>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </ErrorBoundary>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
