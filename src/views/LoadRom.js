import {LargeMessage, Main, Message} from "../Styles";
import styled, {keyframes} from "styled-components";
import RomButton from "../components/RomButton";
import {useContext} from "react";
import {RomContext} from "../context/RomContext";
import Hyperlink from "../components/Hyperlink";
import Version from "../version";
import Marquee from "react-fast-marquee";

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
    const maqueeText = ` ` +
        `You are running version ${Version.revision}. This is a Progressive Web App ✨ ` +
        `If you're on iOS: in Safari tap the Share button in the browser and select "Add to Home Screen". ` +
        `If you're on Android tap the ⋮ button next to the address field and select "Add to Home screen" ` +
        `in the list of options that appears`;
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
                <span style={{width: '90%'}}>
                    <Marquee pauseOnClick={true} gradient={false} speed="60">{maqueeText}</Marquee>
                </span>
            </Section>
        </Portrait>
    );
}