import {Main, LargeMessage, Message} from "../Styles";
import Button from "../components/Button";
import styled, {keyframes} from "styled-components";
import {useContext} from "react";
import {RomContext} from "../context/RomContext";
import FileInput from "../components/FileInput";

const SelectRomButton = styled(Button)`
    width: 75%;
`;

const LoadRomButton = styled(FileInput)`
    width: 75%;
`;

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

const ButtonTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default function LoadRom() {
    const romContext = useContext(RomContext);

    function renderRomTitle(index, title) {
        return (
            <ButtonTitle>
                <span>{`${index}.`}</span><span>{title}</span><span><i className="nes-icon close is-small"/></span>
            </ButtonTitle>
        );
    }

    function renderLocalRomButton(index, title) {
        return (
            <SelectRomButton title={renderRomTitle(index, title)}
                             onClick={async () => await romContext.loadLocalRom(index)}
                             active={romContext.selected === index}/>
        );
    }

    function renderLoadRomButton(index) {
        return (
            <LoadRomButton title={renderRomTitle(index, `<Load ROM>`)}
                           handleContent={content => console.log(content)}/>
        );
    }

    return (
        <Portrait>
            <Section>
                <LargeMessage>Welcome to</LargeMessage>
                <LargeMessage>PWA NES</LargeMessage>
            </Section>
            <Section>
                <Message>
                    If you like this app please click here to <i className="nes-icon is-small star"></i> it on GitHub :)
                </Message>
            </Section>
            <Section>
                <LargeMessage>Select slot</LargeMessage>
                {renderLocalRomButton(1, 'Streemerz')}
                {renderLoadRomButton(2)}
                {renderLoadRomButton(3)}
            </Section>
            <Section>
                <AnimatedComponent>
                    <LargeMessage hide={romContext.selected === undefined}>Rotate device to play!</LargeMessage>
                </AnimatedComponent>
            </Section>
        </Portrait>
    );
}