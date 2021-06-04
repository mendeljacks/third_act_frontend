import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import './app.css'
import {toJS} from 'mobx'
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
});


window.toJS = toJS
ReactDOM.render(

    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>


    , document.getElementById("root"));
