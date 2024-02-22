import React from 'react';
import ReactDOM from 'react-dom';
import "nes.css/css/nes.min.css";
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import "ulog"
import {RomContextProvider} from "./context/RomContext";
import {DeviceOrientationProvider} from "./context/DeviceOrientationContext";

ReactDOM.render(
    <React.StrictMode>
        <DeviceOrientationProvider>
            <RomContextProvider>
                <App/>
            </RomContextProvider>
        </DeviceOrientationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
