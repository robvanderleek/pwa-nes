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
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Button = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const Message = styled.h1`
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

    // const renderNonTouchDevice = () => <Main><Message>Please view this on a mobile device</Message></Main>;

    const renderPortrait = () => <Main><Message>Please view this in landscape mode</Message></Main>;

    function renderButton(name) {
        return (
            <Button
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
                <Area>
                    {renderButton('Select')}
                    <LeftGamePad touchController={touchController}/>
                </Area>
                <Area>
                    {romData && <Emulator romData={romData} controller={touchController} paused={true}/>}
                </Area>
                <Area>
                    {renderButton('Start')}
                    <RightGamePad touchController={touchController}/>
                </Area>
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
        return renderGame();
        // return renderNonTouchDevice();
    }
}