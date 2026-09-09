import {EmulatorCanvas, GameArea, GamepadArea, Main} from "../Styles";
import Button from "../components/Button";
import LeftGamePad from "../LeftGamePad";
import RightGamePad from "../RightGamePad";
import TouchController from "../TouchController";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useRomContext} from "../context/RomContext";
import {Nostalgist} from "nostalgist";

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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nostalgistRef = useRef<Nostalgist | null>(null);
    const [muted, setMuted] = useState<boolean>(true);

    useEffect(() => {
        const initEmulator = async () => {
            if (canvasRef.current) {
                const rom = romContext.slots[romContext.selected!];
                if (rom) {
                    const fileContent = rom.data;
                    const nostalgist = await Nostalgist.launch(
                        {
                            element: canvasRef.current,
                            core: 'fceumm',
                            rom: fileContent,
                            retroarchConfig: {audio_mute_enable: true}
                        });
                    controller.setNostalgist(nostalgist);
                    nostalgistRef.current = nostalgist;
                }
            }
        }
        initEmulator();
        return () => {
            if (nostalgistRef.current) {
                nostalgistRef.current.exit({removeCanvas: false});
                nostalgistRef.current = null;
            }
        }
    }, [canvasRef, romContext.selected]);

    const toggleMute = async () => {
        if (nostalgistRef.current) {
            nostalgistRef.current.sendCommand('MUTE');
            setMuted(!muted);
        }
    }

    return (
        <Main>
            <GamepadArea>
                <UpperLeft>
                    <label className="nes-pointer">
                        <input type="checkbox" className="nes-checkbox is-dark" checked={muted}
                               onChange={toggleMute}/>
                        <span>Mute</span>
                    </label>
                </UpperLeft>
                <Button touchController={controller} controllerButton="select"/>
                <LeftGamePad touchController={controller}/>
            </GamepadArea>
            <GameArea>
                <EmulatorCanvas ref={canvasRef}/>
            </GameArea>
            <GamepadArea>
                <UpperRight onClick={romContext.unselectSlot} className="nes-icon close nes-pointer is-dark"/>
                <Button touchController={controller} controllerButton="start"/>
                <RightGamePad touchController={controller}/>
            </GamepadArea>
        </Main>
    );
}