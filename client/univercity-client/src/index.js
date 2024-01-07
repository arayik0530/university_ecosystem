import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import './index.css';
import {createTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';
import {Provider} from "react-redux";
import store from "./redux/store";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const root = document.getElementById('root');

const render = (Component) => {
    createRoot(root).render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Component/>
                </Provider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
