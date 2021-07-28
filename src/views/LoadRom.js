import {LargeMessage, Main, Message} from "../Styles";
import styled, {keyframes} from "styled-components";
import RomButton from "../components/RomButton";
import {useContext} from "react";
import {RomContext} from "../context/RomContext";
import Hyperlink from "../components/Hyperlink";

const Portrait = styled(Main)`
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 20px;
`;

function blinkingEffect() {
    return keyframes`
    50% {
      opacity: 0;
    }
  `;
}

const AnimatedComponent = styled.div`
    animation: ${blinkingEffect} 1s linear infinite;
`

export default function LoadRom() {
    const romContext = useContext(RomContext);
    return (
        <Portrait>
            <Section>
                <LargeMessage>Welcome to</LargeMessage>
                <LargeMessage>PWA NES</LargeMessage>
            </Section>
            <Section>
                <Message>
                    <Hyperlink href="https://github.com/robvanderleek/pwa-nes">
                        If you like this app please click here to <i className="nes-icon is-small star"/> it on GitHub
                        :)
                    </Hyperlink>
                </Message>
            </Section>
            <Section>
                <LargeMessage>Select slot</LargeMessage>
                <RomButton index={0}/>
                <RomButton index={1}/>
                <RomButton index={2}/>
            </Section>
            <Section>
                <AnimatedComponent>
                    <LargeMessage hide={romContext.selected === undefined}>Rotate device to play!</LargeMessage>
                </AnimatedComponent>
            </Section>
        </Portrait>
    );
}