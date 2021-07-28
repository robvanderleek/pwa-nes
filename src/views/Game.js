import {EmulatorArea, GamepadArea, Main} from "../Styles";
import Button from "../components/Button";
import LeftGamePad from "../LeftGamePad";
import Emulator from "../jsnes/Emulator";
import RightGamePad from "../RightGamePad";
import TouchController from "../TouchController";
import {useContext, useState} from "react";
import {RomContext} from "../context/RomContext";
import styled from "styled-components";

const controller = new TouchController();

const UpperLeft = styled.div`
    position: fixed;
    left: 15px;
    top: 15px;
`

const UpperRight = styled.i`
    position: fixed;
    right: 15px;
    top: 15px;
`

export default function Game() {
    const romContext = useContext(RomContext);
    const [muted, setMuted] = useState(true);
    return (
        <Main>
            <GamepadArea>
                <UpperLeft>
                    <label>
                        <input type="checkbox" className="nes-checkbox is-dark" checked={!muted} onChange={() => setMuted(!muted)}/>
                        <span>Sound</span>
                    </label>
                </UpperLeft>
                <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Select"/>
                <LeftGamePad touchController={controller}/>
            </GamepadArea>
            <EmulatorArea>
                {romContext.selected !== undefined &&
                <Emulator romData={romContext.slots[romContext.selected].data} controller={controller}
                          paused={true} muted={muted}/>}
            </EmulatorArea>
            <GamepadArea>
                <UpperRight onClick={romContext.unselectSlot} className="nes-icon close is-small"/>
                <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Start"/>
                <RightGamePad touchController={controller}/>
            </GamepadArea>
        </Main>
    );
}