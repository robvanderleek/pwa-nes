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

const Message = styled.h1`
    text-align: center;
`;

export default function App() {
    const [messages, setMessages] = useState([]);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [orientation, setOrientation] = useState(null);

    useEffect(() => {
        checkDevice();
        checkOrientation();
        addOrientationChangeListener();
    });

    function addOrientationChangeListener() {
        window.addEventListener('orientationchange', function () {
            const afterOrientationChange = function () {
                setOrientation(getOrientation());
                window.removeEventListener('resize', afterOrientationChange);
            };
            window.addEventListener('resize', afterOrientationChange);
        });

        window.addEventListener('resize', () => checkDevice());
    }

    function checkDevice() {
        const touchDeviceCheckResult = ('ontouchstart' in document.documentElement);
        console.log('HERE ' + touchDeviceCheckResult);
        setIsTouchDevice(touchDeviceCheckResult);
    }

    function checkOrientation() {
        const orientationCheckResult = getOrientation();
        setOrientation(orientationCheckResult);
        console.log(orientationCheckResult);
    }

    function getOrientation() {
        return window.screen.orientation.angle === 0 ? 'portrait' : 'landscape';
    }

    function pushMessage(message) {
        messages.push(message);
        setMessages([...messages]);
    }

    const pushLeft = () => pushMessage('left');

    const pushRight = () => pushMessage('right');

    function renderNonTouchDevice() {
        return (
            <Main>
                <Message>Please view this on a mobile device</Message>
            </Main>
        );
    }

    const renderPortrait = () => <Main><Message>Please view this in landscape mode</Message></Main>;

    function renderGame() {
        return (
            <Main>
                <Area onClick={pushLeft}>
                    <div>left</div>
                </Area>
                <Area>
                    {messages.map((m, i) => <div key={i}>{m}</div>)}
                </Area>
                <Area onClick={pushRight}>
                    <div>right</div>
                </Area>
            </Main>
        );
    }

    if (isTouchDevice) {
        if (orientation === 'portrait') {
            return renderPortrait();
        } else {
            return renderGame();
        }
    } else {
        return renderNonTouchDevice();
    }
}