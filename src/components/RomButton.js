import {useContext} from "react";
import {RomContext} from "../context/RomContext";
import styled from "styled-components";
import Button from "./Button";
import FileInput from "./FileInput";
import PropTypes from "prop-types";

const SelectRomButton = styled(Button)`
    width: 75%;
`;

const LoadRomButton = styled(FileInput)`
    width: 75%;
`;

const ButtonTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DeleteButton = styled.span`
    z-index: 1000;
`

export default function RomButton(props) {
    const {index} = props;
    const romContext = useContext(RomContext);

    function handleDeleteClick(event) {
        if (index > 0) {
            romContext.removeRom(index);
            event.stopPropagation();
        }
    }

    function renderDeleteButton(index) {
        let deleteButton;
        const classNames = 'nes-icon close is-small';
        if (index === 0 || romContext.slots[index] === undefined) {
            deleteButton = <i style={{visibility: 'hidden'}} className={classNames}/>
        } else {
            deleteButton = <i className={classNames}/>;
        }
        return (<DeleteButton onClick={(e) => handleDeleteClick(e)}>{deleteButton}</DeleteButton>);
    }

    function renderRomTitle(index, title) {
        return (
            <ButtonTitle>
                <span>{`${index + 1}.`}</span><span>{title}</span>{renderDeleteButton(index)}
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

    return renderRomButton(index);
}

RomButton.propTypes = {
    index: PropTypes.number.isRequired
}