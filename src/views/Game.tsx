import {EmulatorArea, GamepadArea, Main} from "../Styles";
import Button from "../components/Button";
import LeftGamePad from "../LeftGamePad";
import RightGamePad from "../RightGamePad";
import TouchController from "../TouchController";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useRomContext} from "../context/RomContext";
import {Browser} from "jsnes";

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
    padding-left: 30px;
    padding-right: 30px;
`

export default function Game() {
    const romContext = useRomContext();
    const divRef = useRef<HTMLDivElement>(null);
    const browserRef = useRef<Browser>(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        // <Emulator romData={romContext.slots[romContext.selected]?.data} controller={controller}
        //      paused={false} muted={muted} romContext={romContext}/>}
        if (divRef.current) {
            browserRef.current = new Browser({
                container: divRef.current as HTMLElement,
                romData: romContext.slots[romContext.selected!]?.data,
            });
            return () => browserRef.current?.destroy();
        }
    }, [divRef, romContext.selected]);
    return (
        <Main>
            <GamepadArea>
                <UpperLeft>
                    <label>
                        <input type="checkbox" className="nes-checkbox is-dark" checked={!muted}
                               onChange={() => setMuted(!muted)}/>
                        <span>Sound</span>
                    </label>
                </UpperLeft>
                <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Select"/>
                <LeftGamePad touchController={controller}/>
            </GamepadArea>
            <EmulatorArea>
                {romContext.selected !== null && <div ref={divRef}/>}
            </EmulatorArea>
            <GamepadArea>
                <UpperRight onClick={romContext.unselectSlot} className="nes-icon close is-dark is-small"/>
                <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Start"/>
                <RightGamePad touchController={controller}/>
            </GamepadArea>
        </Main>
    );
}