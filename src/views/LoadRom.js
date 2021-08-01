import {LargeMessage, Main, Message} from "../Styles";
import styled, {keyframes} from "styled-components";
import RomButton from "../components/RomButton";
import {useContext, useState} from "react";
import {RomContext} from "../context/RomContext";
import Hyperlink from "../components/Hyperlink";
import Version from "../version";
import Marquee from "react-fast-marquee";
import Readme from "./Readme";

export const Portrait = styled(Main)`
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const Section = styled.div`
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
    const [showReadme, setShowReadme] = useState(false);
    const readme = <Main onClick={() => setShowReadme(false)}><Readme/></Main>;
    if (showReadme) {
        return readme;
    }
    const marqueeText = `You are running version ${Version.revision}. Click on this scrolling text for more information. `;
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
            <Section>
                <span onClick={() => setShowReadme(true)} style={{width: '90%'}}>
                    <Marquee pauseOnClick={true} gradient={false} speed="60">{marqueeText}</Marquee>
                </span>
            </Section>
        </Portrait>
    );
}