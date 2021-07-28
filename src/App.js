import {useContext, useEffect, useState} from "react";
import {LargeMessage, Main} from "./Styles";
import LoadRom from "./views/LoadRom";
import {RomContext} from "./context/RomContext";
import Game from "./views/Game";

export default function App() {
    const [initializing, setInitializing] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [orientation, setOrientation] = useState(null);
    const romContext = useContext(RomContext);

    useEffect(() => {
        addOrientationChangeListener();
        checkDevice();
        checkOrientation();
        setInitializing(false);
        // eslint-disable-next-line
    }, []);


    function addOrientationChangeListener() {
        window.addEventListener('resize', () => checkOrientation());
    }

    function checkDevice() {
        const touchDeviceCheckResult = ('ontouchstart' in document.documentElement);
        setIsTouchDevice(touchDeviceCheckResult);
    }

    function checkOrientation() {
        const orientationCheckResult = getOrientation();
        setOrientation(orientationCheckResult);
    }

    function getOrientation() {
        let result;
        const screenOrientation = window.screen.orientation;
        if (screenOrientation) {
            result = screenOrientation.angle === 0 ? 'portrait' : 'landscape';
        } else {
            const mql = window.matchMedia("(orientation: portrait)");
            if (mql.matches) {
                result = 'portrait';
            } else {
                result = 'landscape';
            }
        }
        return result;
    }

    const renderNonTouchDevice = () => <Main><LargeMessage>Please view this on a mobile device</LargeMessage></Main>;

    const renderNoRomSelected = () => <Main><LargeMessage>Rotate to select a ROM to play</LargeMessage></Main>;

    if (initializing) {
        return null;
    } else if (isTouchDevice) {
        if (orientation === 'portrait') {
            return (<LoadRom/>);
        } else {
            if (romContext.selected !== undefined) {
                return (<Game/>);
            } else {
                return renderNoRomSelected();
            }
        }
    } else {
        return renderNonTouchDevice();
    }
}