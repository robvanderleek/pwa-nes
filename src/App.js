import styled from "styled-components";
import {useEffect, useState} from "react";
import Emulator from "./jsnes/Emulator";
import {unzip} from "unzipit";
import TouchController from "./TouchController";
import LeftGamePad from "./LeftGamePad";
import RightGamePad from "./RightGamePad";

const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Area = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: none;
    -webkit-user-select: none;    
`;

const GamepadArea = styled(Area)`
    width: 25%;
`;

const EmulatorArea = styled(Area)`
    width: 50%;
`;

const Button = styled.button`
    user-select: none;
`;

const Message = styled.h2`
    text-align: center;
`;

const touchController = new TouchController();

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

    const renderPortrait = () => <Main><Message>Rotate device to landscape mode to play!</Message></Main>;

    function renderButton(name) {
        return (
            <Button className="nes-btn"
                    onMouseDown={() => touchController.handleButtonDown(name)}
                    onMouseUp={() => touchController.handleButtonUp(name)}
                    onTouchStart={() => touchController.handleButtonDown(name)}
                    onTouchEnd={() => touchController.handleButtonUp(name)}
            >{name}</Button>
        );
    }

    function renderGame() {
        return (
            <Main>
                <GamepadArea>
                    {renderButton('Select')}
                    <LeftGamePad touchController={touchController}/>
                </GamepadArea>
                <EmulatorArea>
                    {romData && <Emulator romData={romData} controller={touchController} paused={true}/>}
                </EmulatorArea>
                <GamepadArea>
                    <i style={{position: 'fixed', right: '15px', top: '15px'}} className="nes-icon close is-medium"/>
                    {renderButton('Start')}
                    <RightGamePad touchController={touchController}/>
                </GamepadArea>
            </Main>
        );
    }

    if (initializing) {
        return null;
    } else if (isTouchDevice) {
        if (orientation === 'portrait') {
            return renderPortrait();
        } else {
            return renderGame();
        }
    } else {
        return renderNonTouchDevice();
    }
}