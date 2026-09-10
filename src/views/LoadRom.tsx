import {HideableLargeMessage, LargeMessage, Main, Message} from "../Styles";
import styled, {keyframes} from "styled-components";
import RomButton from "../components/RomButton";
import {useState} from "react";
import Hyperlink from "../components/Hyperlink";
import Version from "../version";
import Readme from "./Readme";
import {useRomContext} from "../context/RomContext";
import {Portrait, Section} from "./LoadRom.style";
import {useDeviceOrientation} from "../context/DeviceOrientationContext";
import MarqueeModule from "react-fast-marquee";

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
    const romContext = useRomContext();
    const {isTouchDevice} = useDeviceOrientation();
    const [showReadme, setShowReadme] = useState(false);
    // @ts-ignore
    const Marquee = MarqueeModule.default;

    const renderPlayOption = () => {
        if (isTouchDevice) {
            return (
                <AnimatedComponent>
                    <HideableLargeMessage hide={romContext.selected === undefined}>Rotate device to
                        play!</HideableLargeMessage>
                </AnimatedComponent>
            );
        } else {
            return null;
        }
    }

    const renderMarquee = () => {
        const marqueeText = `You are running version ${Version.gitSha.substring(0,
            7)}. Click on this scrolling text for more information. `;
        return (<Marquee pauseOnClick={true} gradient={false} speed={60}>{marqueeText}</Marquee>);
    }

    if (showReadme) {
        return (<Main onClick={() => setShowReadme(false)}><Readme/></Main>);
    } else {
        return (
            <Portrait>
                <Section>
                    <LargeMessage>Welcome to</LargeMessage>
                    <LargeMessage>Web-NES</LargeMessage>
                </Section>
                <Section>
                    <Message>
                        <Hyperlink href="https://github.com/robvanderleek/web-nes">
                            If you like this app please click here to <i className="nes-icon is-small star"/> it on
                            GitHub
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
                    {renderPlayOption()}
                </Section>
                <Section>
                    <span onClick={() => setShowReadme(true)} style={{width: '90%'}}>
                        <Marquee pauseOnClick={true} gradient={false} speed={60}>{renderMarquee()}</Marquee>
                    </span>
                </Section>
            </Portrait>
        );
    }
}