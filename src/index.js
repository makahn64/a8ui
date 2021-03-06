import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {SnackbarProvider} from "notistack";
import 'react-json-pretty/themes/monikai.css';


const appCore = <SnackbarProvider maxSnack={3}>
    <App/></SnackbarProvider>

ReactDOM.render(appCore, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
