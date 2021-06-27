import styled from "styled-components";
import {useEffect, useState} from "react";

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
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const Message = styled.h1`
    text-align: center;
`;

export default function App() {
    const [messages, setMessages] = useState([]);
    const [initializing, setInitializing] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [orientation, setOrientation] = useState(null);

    useEffect(() => {
        addOrientationChangeListener();
        checkDevice();
        checkOrientation();
        setInitializing(false);
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

    function pushMessage(message) {
        messages.push(message);
        setMessages([...messages]);
    }

    // const renderNonTouchDevice = () => <Main><Message>Please view this on a mobile device</Message></Main>;

    const renderPortrait = () => <Main><Message>Please view this in landscape mode</Message></Main>;

    function renderButton(title, onClick) {
        return (<Button onClick={onClick}>{title}</Button>);
    }

    function renderGame() {
        return (
            <Main>
                <Area>
                    {renderButton('Select', () => pushMessage('select'))}
                    {renderButton('Up', () => pushMessage('up'))}
                    {renderButton('Right', () => pushMessage('right'))}
                    {renderButton('Down', () => pushMessage('down'))}
                    {renderButton('Left', () => pushMessage('Left'))}
                </Area>
                <Area>
                    {messages.map((m, i) => <div key={i}>{m}</div>)}
                </Area>
                <Area>
                    {renderButton('Start', () => pushMessage('start'))}
                    {renderButton('B', () => pushMessage('B'))}
                    {renderButton('A', () => pushMessage('A'))}
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