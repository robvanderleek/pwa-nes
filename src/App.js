import styled from "styled-components";
import {useState} from "react";

const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
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

    function pushLeft() {
        messages.push('left');
        setMessages([...messages]);
    }

    function pushRight() {
        messages.push('right');
        setMessages([...messages]);
    }

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