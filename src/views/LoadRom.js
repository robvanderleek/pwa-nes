import {LargeMessage, Main, Message} from "../Styles";
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
        let deleteButton;
        if (index === 0 || romContext.slots[index] === undefined) {
            deleteButton = <i style={{visibility: 'hidden'}} className="nes-icon close is-small"/>
        } else {
            deleteButton = <i className="nes-icon close is-small"/>;
        }
        return (
            <ButtonTitle>
                <span>{`${index + 1}.`}</span><span>{title}</span><span>{deleteButton}</span>
            </ButtonTitle>
        );
    }

    function renderRomButton(index) {
        const rom = romContext.slots[index];
        if (rom) {
            return (
                <SelectRomButton title={renderRomTitle(index, rom.name)}
                                 onClick={async () => await romContext.selectSlot(index)}
                                 active={romContext.selected === index}/>
            );
        } else {
            return (
                <LoadRomButton title={renderRomTitle(index, `<Load ROM>`)}
                               handleContent={(romName, data) => romContext.addRom(index, romName, data)}/>
            );
        }
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
                {renderRomButton(0)}
                {renderRomButton(1)}
                {renderRomButton(2)}
            </Section>
            <Section>
                <AnimatedComponent>
                    <LargeMessage hide={romContext.selected === undefined}>Rotate device to play!</LargeMessage>
                </AnimatedComponent>
            </Section>
        </Portrait>
    );
}