import {useRomContext} from "../context/RomContext";
import {ButtonTitle, DeleteButton, SlotLabel} from "./RomButton.style";
import React from "react";
import FileInput from "./FileInput";


export default function RomButton(props: { index: number }) {
    const {index} = props;
    const romContext = useRomContext();

    function handleDeleteClick(event: React.MouseEvent) {
        if (index > 0) {
            romContext.removeRom(index);
            event.stopPropagation();
        }
    }

    function renderDeleteButton(index: number) {
        let deleteButton;
        const classNames = 'nes-icon close is-small';
        if (index === 0 || romContext.slots[index] === undefined) {
            deleteButton = <i style={{visibility: 'hidden'}} className={classNames}/>
        } else {
            deleteButton = <i className={classNames}/>;
        }
        return (<DeleteButton onClick={(e) => handleDeleteClick(e)}>{deleteButton}</DeleteButton>);
    }

    function renderRomTitle(index: number, title: string) {
        return (
            <ButtonTitle>
                <span>{`${index + 1}.`}</span><span>{title}</span>{renderDeleteButton(index)}
            </ButtonTitle>
        );
    }

    async function handleClick(index: number) {
        if (romContext.selected === index) {
            romContext.unselectSlot();
        } else {
            await romContext.selectSlot(index);
        }
    }

    function renderRomButton(index: number) {
        const rom = romContext.slots[index];
        if (rom) {
            const classNames = [];
            classNames.push('nes-btn');
            if (romContext.selected === index) {
                classNames.push('is-success');
            }
            return (
                <SlotLabel className={classNames.join(' ')} onClick={async () => handleClick(index)}>{renderRomTitle(
                    index, rom.name)}</SlotLabel>
            );
        } else {
            return (
                <FileInput title={renderRomTitle(index, '<Load ROM>')}
                           handleContent={(romName, data) => romContext.addRom(index, romName, data)}/>
            );
        }
    }

    return renderRomButton(index);
}