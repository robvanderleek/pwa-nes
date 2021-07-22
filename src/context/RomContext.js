import React, {Component} from "react";
import streemerz from "../static/streemerz-v02.zip";
import {unzip} from "unzipit";

export const RomContext = React.createContext({});

export class RomContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            slot1: this.loadLocalStorageSlot(1),
            slot2: this.loadLocalStorageSlot(2),
        }
    }

    loadRom = async (url) => {
        const unzipped = await unzip(url);
        const firstEntry = Object.keys(unzipped.entries)[0];
        const buffer = new Int8Array(await unzipped.entries[firstEntry].arrayBuffer());
        let result = "";
        for (let i = 0; i < buffer.length; i++) {
            result += String.fromCharCode(buffer[i]);
        }
        return result
    }

    loadLocalStorageSlot = (index) => {
        const item = localStorage.getItem(`SLOT_${index}`);
        if (item) {
            return JSON.parse(item);
        } else {
            return undefined;
        }
    }

    loadLocalRom = async (index) => {
        if (index === 1) {
            const romData = await this.loadRom(streemerz);
            this.setState({selected: index, romData: romData});
        }
    }

    render() {
        const {children} = this.props;
        return (
            <RomContext.Provider value={{
                ...this.state,
                loadLocalRom: this.loadLocalRom
            }}>
                {children}
            </RomContext.Provider>
        );
    }

}