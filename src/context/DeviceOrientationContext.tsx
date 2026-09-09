import React, {createContext, ReactNode, useContext, useEffect} from "react";

type Orientation = 'portrait' | 'landscape' | null;

interface DeviceOrientationContextValue {
    initializing: boolean;
    isTouchDevice: boolean;
    orientation: Orientation;
    screenWidth: number;
}

const DeviceOrientationContext = createContext({} as DeviceOrientationContextValue);

export const DeviceOrientationContextProvider = (props: { children?: ReactNode }) => {
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);
    const [initializing, setInitializing] = React.useState(true);
    const [orientation, setOrientation] = React.useState<Orientation>(null);
    const [screenWidth, setScreenWidth] = React.useState(window.screen.width);

    useEffect(() => {
        addOrientationChangeListener();
        setInterval(checkOrientation, 2000);
        checkDevice();
        checkOrientation();
        setInitializing(false);
    });

    const addOrientationChangeListener = () => {
        const supportsOrientationChange = "onorientationchange" in window;
        const orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        window.addEventListener(orientationEvent, () => checkOrientation(), false);
    }

    const checkOrientation = () => {
        const newScreenWidth = window.screen.width;
        const newScreenHeight = window.screen.height;
        let orientation: Orientation;
        const screenOrientation = window.screen.orientation;
        if (screenOrientation) {
            orientation = screenOrientation.angle === 0 ? 'portrait' : 'landscape';
        } else if (screenWidth !== newScreenWidth) {
            orientation = newScreenWidth < newScreenHeight ? 'portrait' : 'landscape';
        } else {
            const mql = window.matchMedia("(orientation: portrait)");
            orientation = mql.matches ? 'portrait' : 'landscape';
        }
        setOrientation(orientation);
        setScreenWidth(newScreenWidth);
    }

    const checkDevice = () => {
        const touchDeviceCheckResult = ('ontouchstart' in document.documentElement);
        setIsTouchDevice(touchDeviceCheckResult);
    }

    return (
        <DeviceOrientationContext.Provider value={{
            initializing,
            isTouchDevice,
            orientation,
            screenWidth
        }}>
            {props.children}
        </DeviceOrientationContext.Provider>
    );
}

export const useDeviceOrientation = () => useContext(DeviceOrientationContext);