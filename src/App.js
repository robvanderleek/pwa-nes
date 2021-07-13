import {useEffect, useState} from "react";
import Emulator from "./jsnes/Emulator";
import {unzip} from "unzipit";
import TouchController from "./TouchController";
import LeftGamePad from "./LeftGamePad";
import RightGamePad from "./RightGamePad";
import {EmulatorArea, GamepadArea, Main, Message} from "./Styles";
import LoadRom from "./views/LoadRom";
import Button from "./components/Button";

const controller = new TouchController();

export default function App() {
    const [initializing, setInitializing] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [orientation, setOrientation] = useState(null);
    const [romData, setRomData] = useState(undefined);

    useEffect(() => {
        addOrientationChangeListener();
        checkDevice();
        checkOrientation();
        setInitializing(false);
        const loadRom = async () => {
            const url = 'https://static.emulatorgames.net/roms/nintendo/Super%20Mario%20Bros%20(E).zip';
            const unzipped = await unzip(url);
            const firstEntry = Object.keys(unzipped.entries)[0];
            const buffer = new Int8Array(await unzipped.entries[firstEntry].arrayBuffer());
            let romDataString = "";
            for (let i = 0; i < buffer.length; i++) {
                romDataString += String.fromCharCode(buffer[i]);
            }
            setRomData(romDataString);
        }
        loadRom();
        // eslint-disable-next-line
    }, []);


    function addOrientationChangeListener() {
        window.addEventListener('resize', () => window.location.reload());
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

    const renderNonTouchDevice = () => <Main><Message>Please view this on a mobile device</Message></Main>;

    function renderGame() {
        return (
            <Main>
                <GamepadArea>
                    <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Select"/>
                    <LeftGamePad touchController={controller}/>
                </GamepadArea>
                <EmulatorArea>
                    {romData && <Emulator romData={romData} controller={controller} paused={true}/>}
                </EmulatorArea>
                <GamepadArea>
                    <i style={{position: 'fixed', right: '15px', top: '15px'}} className="nes-icon close is-medium"/>
                    <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Start"/>
                    <RightGamePad touchController={controller}/>
                </GamepadArea>
            </Main>
        );
    }

    if (initializing) {
        return null;
    } else if (isTouchDevice) {
        if (orientation === 'portrait') {
            return (<LoadRom/>);
        } else {
            return renderGame();
        }
    } else {
        return renderNonTouchDevice();
    }
}