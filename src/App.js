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

export default function App() {
    const [messages, setMessages] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        checkDevice();
    }, []);

    function checkDevice() {
        const mobileCheckResult = window.matchMedia("only screen and (max-width: 760px)").matches;
        setIsMobile(mobileCheckResult);
    }

    function pushLeft() {
        messages.push('left');
        setMessages([...messages]);
    }

    function pushRight() {
        messages.push('right');
        setMessages([...messages]);
    }

    function renderDesktop() {
        return (
            <Main>
                <h1>Please view this on a mobile device</h1>
            </Main>
        );
    }

    function renderMobile() {
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

    if (isMobile) {
        return renderMobile();
    } else {
        return renderDesktop();
    }
}