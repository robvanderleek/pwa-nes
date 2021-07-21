import {useContext, useEffect, useState} from "react";
import Emulator from "./jsnes/Emulator";
import TouchController from "./TouchController";
import LeftGamePad from "./LeftGamePad";
import RightGamePad from "./RightGamePad";
import {EmulatorArea, GamepadArea, Main, Message} from "./Styles";
import LoadRom from "./views/LoadRom";
import Button from "./components/Button";
import {RomContext} from "./context/RomContext";

const controller = new TouchController();

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

    const renderNonTouchDevice = () => <Main><Message>Please view this on a mobile device</Message></Main>;

    const renderNoRomSelected = () => <Main><Message>Please select a ROM to play</Message></Main>;

    function renderGame() {
        return (
            <Main>
                <GamepadArea>
                    <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Select"/>
                    <LeftGamePad touchController={controller}/>
                </GamepadArea>
                <EmulatorArea>
                    {romContext.romData &&
                    <Emulator romData={romContext.romData} controller={controller} paused={true}/>}
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
            if (romContext.selected) {
                return renderGame();
            } else {
                return renderNoRomSelected();
            }
        }
    } else {
        return renderNonTouchDevice();
    }
}