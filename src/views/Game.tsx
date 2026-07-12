import {EmulatorArea, GameArea, GamepadArea, Main} from "../Styles";
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
    const browserRef = useRef<Browser | null>(null);
    const [muted, setMuted] = useState<boolean>(true);

    useEffect(() => {
        // <Emulator romData={romContext.slots[romContext.selected]?.data} controller={controller}
        //      paused={false} muted={muted} romContext={romContext}/>}
        if (divRef.current) {
            const browser = new Browser({
                container: divRef.current as HTMLElement,
                romData: romContext.slots[romContext.selected!]?.data,
            });
            browserRef.current = browser;
            controller.setOnButtonDown(browser.nes.buttonDown);
            controller.setOnButtonUp(browser.nes.buttonUp);
            // @ts-ignore
            browser.nes.papu.setMasterVolume(0);
            browser.keyboard
            // Browser.loadROMFromURL("https://raw.githubusercontent.com/robvanderleek/pwa-nes/refs/heads/issue-15-Migrate_to_TypeScript/src/static/streemerz-v02.nes", function (err, data) {
            //     if (err) {
            //         console.error(err);
            //         return;
            //     }
            //     if (data) {
            //         browser.loadROM(data);
            //     }
            // });
            // browser.
            //     browserRef.current.start();
            browser.fitInParent();
            window.addEventListener('resize', fitEmulatorInParent);
            return () => {
                window.removeEventListener('resize', fitEmulatorInParent);
                controller.setOnButtonDown(undefined);
                controller.setOnButtonUp(undefined);

                browserRef.current?.destroy();
            }
        }
    }, [divRef, romContext.selected]);

    const fitEmulatorInParent = () => {
        browserRef.current?.fitInParent();
    }

    const setMasterVolume = (volume: number) => {
        // @ts-ignore
        browserRef.current?.nes.papu.setMasterVolume(volume);
    }

    const toggleMute = () => {
        if (muted) {
            setMasterVolume(255);
            setMuted(false);
        } else {
            setMasterVolume(0);
            setMuted(true);
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
                <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Select"/>
                <LeftGamePad touchController={controller}/>
            </GamepadArea>
            <GameArea>
                {romContext.selected !== null && <EmulatorArea ref={divRef}/>}
            </GameArea>
            <GamepadArea>
                <UpperRight onClick={romContext.unselectSlot} className="nes-icon close nes-pointer is-dark"/>
                <Button onDown={controller.handleButtonDown} onUp={controller.handleButtonUp} title="Start"/>
                <RightGamePad touchController={controller}/>
            </GamepadArea>
        </Main>
    );
}