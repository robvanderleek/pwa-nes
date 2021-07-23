import React, {Component} from "react";
import streemerz from "../static/streemerz-v02.zip";
import {unzip} from "unzipit";

export const RomContext = React.createContext({});

export class RomContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            roms: ['Streemerz', undefined, undefined]
        }
    }

    loadZippedRomData = async (data) => {
        const unzipped = await unzip(data);
        const firstEntry = Object.keys(unzipped.entries)[0];
        console.log(firstEntry);
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

    loadRomSlot = (index) => {
        const slotKey = `SLOT_${index}`;
        const item = localStorage.getItem(slotKey);
        if (item) {
            return JSON.parse(item);
        } else {
            return undefined;
        }
    }

    saveRomSlot = (index, data) => {
        const slotKey = `SLOT_${index}`;
        localStorage.setItem(slotKey, JSON.stringify({data: data}));
    }

    loadRom = async (index) => {
        const rom = this.loadRomSlot(index);
        if (index === 0) {
            if (rom) {
                this.setState({selected: index, rom: rom});
            } else {
                const romData = await this.loadZippedRomData(streemerz);
                this.saveRomSlot(index, romData);
                this.setState({selected: index, rom: {data: romData}});
            }
        } else if (rom) {
            this.setState({selected: index, rom: rom});
        }
    }

    addRom = async (index, name, data) => {
        if (name.toLowerCase().endsWith(".zip")) {
            const romData = this.loadZippedRomData(data);
            this.saveRomSlot(index, romData);
        } else {
            const romData = this.arrayBufferToString(data);
            this.saveRomSlot(index, romData);
        }
        const {roms} = this.state;
        roms[index] = name;
        this.setState({roms: roms});
        await this.loadRom(index);
    }

    render() {
        const {children} = this.props;
        return (
            <RomContext.Provider value={{
                ...this.state,
                addRom: this.addRom,
                loadRom: this.loadRom,
            }}>
                {children}
            </RomContext.Provider>
        );
    }

}