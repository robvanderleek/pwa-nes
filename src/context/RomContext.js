import React, {Component} from "react";
import streemerz from "../static/streemerz-v02.zip";
import {unzip} from "unzipit";
import {prettifyRomName} from "../utils";

export const RomContext = React.createContext({});

export class RomContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            slots: [this.loadSlot(0), this.loadSlot(1), this.loadSlot(2)],
        }
    }

    async componentDidMount() {
        const {slots} = this.state;
        if (slots[0] === undefined || slots[0].name !== 'Streemerz') {
            const romData = await this.loadZippedRomData(streemerz);
            this.saveSlot(0, 'Streemerz', romData);
        }
    }

    loadZippedRomData = async (data) => {
        const unzipped = await unzip(data);
        const firstEntry = Object.keys(unzipped.entries)[0];
        return this.arrayBufferToString(await unzipped.entries[firstEntry].arrayBuffer());
    }

    arrayBufferToString = (arrayBuffer) => {
        const array = new Int8Array(arrayBuffer);
        let result = "";
        for (let i = 0; i < array.length; i++) {
            result += String.fromCharCode(array[i]);
        }
        return result
    }

    loadSlot = (index) => {
        const slotKey = `SLOT_${index}`;
        const item = localStorage.getItem(slotKey);
        if (item) {
            return JSON.parse(item);
        } else {
            return undefined;
        }
    }

    saveSlot = (index, name, data) => {
        const {slots} = this.state;
        const slotKey = `SLOT_${index}`;
        const rom = {name: prettifyRomName(name), data: data};
        localStorage.setItem(slotKey, JSON.stringify(rom));
        slots[index] = rom;
        this.setState({slots: slots});
    }

    selectSlot = (index) => {
        this.setState({selected: index});
    }

    unselectSlot = () => this.setState({selected: undefined});

    addRom = async (index, name, data) => {
        if (name.toLowerCase().endsWith(".zip")) {
            const romData = await this.loadZippedRomData(data);
            this.saveSlot(index, name, romData);
        } else {
            const romData = this.arrayBufferToString(data);
            this.saveSlot(index, name, romData);
        }
        this.selectSlot(index);
    }

    removeRom = (index) => {
        const {selected, slots} = this.state;
        slots[index] = undefined;
        if (index === selected) {
            this.setState({selected: undefined, slots: slots});
        } else {
            this.setState({slots: slots});
        }
    }

    render() {
        const {children} = this.props;
        return (
            <RomContext.Provider value={{
                ...this.state,
                addRom: this.addRom,
                removeRom: this.removeRom,
                selectSlot: this.selectSlot,
                unselectSlot: this.unselectSlot
            }}>
                {children}
            </RomContext.Provider>
        );
    }

}