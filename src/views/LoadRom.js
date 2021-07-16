import {Main, Message} from "../Styles";
import Button from "../components/Button";
import styled from "styled-components";
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

export default function LoadRom() {
    // const romContext = useContext(RomContext);

    return (
        <Portrait>
            <Section>
                <Message>Select ROM</Message>
                <RomButton title="1. What Remains" active/>
                <RomButton title="2. TNOTFS"/>
                <RomButton title="3. <Load ROM>"/>
            </Section>
            <Section>
                <Message>Rotate device to play!</Message>
            </Section>
        </Portrait>
    );
}