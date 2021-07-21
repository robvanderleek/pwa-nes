import {Main, Message} from "../Styles";
import Button from "../components/Button";
import styled, {keyframes} from "styled-components";
import {useContext} from "react";
import {RomContext} from "../context/RomContext";

const RomButton = styled(Button)`
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

    function renderLocalRomButton(index, title) {
        return (
            <RomButton title={`${index}. ${title}`} onClick={async () => await romContext.loadLocalRom(index)}
                       active={romContext.selected === index}/>
        );
    }

    return (
        <Portrait>
            <Section>
                <Message>Select ROM</Message>
                {renderLocalRomButton(1, 'What Remains', 'whatremains-1.0.2.zip')}
                {renderLocalRomButton(2, 'TNOTFS', 'The Ninja of the 4 Seasons_V1.1.zip')}
                <RomButton title="3. <Load ROM>"/>
            </Section>
            <Section>
                <AnimatedComponent>
                    <Message hide={romContext.selected === undefined}>Rotate device to play!</Message>
                </AnimatedComponent>
            </Section>
        </Portrait>
    );
}