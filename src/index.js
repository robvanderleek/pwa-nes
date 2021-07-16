import React from 'react';
import ReactDOM from 'react-dom';
import "nes.css/css/nes.min.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "ulog"
import {RomContextProvider} from "./context/RomContext";

ReactDOM.render(
    <React.StrictMode>
        <RomContextProvider>
            <App/>
        </RomContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
