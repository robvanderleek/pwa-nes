import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import "nes.css/css/nes.min.css";
import './index.css';
import App from './App';
import "ulog"
import {RomContextProvider} from "./context/RomContext";
import {DeviceOrientationContextProvider} from "./context/DeviceOrientationContext";

const Index = () => {
    return (
        <React.StrictMode>
            <DeviceOrientationContextProvider>
                <RomContextProvider>
                    <App/>
                </RomContextProvider>
            </DeviceOrientationContextProvider>
        </React.StrictMode>
    );
}

const container = document.getElementById('root') as Element;
const root = ReactDOMClient.createRoot(container);
root.render(<Index/>);
