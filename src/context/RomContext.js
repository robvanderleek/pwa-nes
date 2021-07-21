import React, {Component} from "react";
import whatremains from "../static/whatremains-1.0.2.zip";
import tnot4s from '../static/The Ninja of the 4 Seasons_V1.1.zip';
import {unzip} from "unzipit";

export const RomContext = React.createContext({});

export class RomContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            slot1: this.loadLocalStorageSlot(1),
            slot2: this.loadLocalStorageSlot(2),
            slot3: this.loadLocalStorageSlot(3),
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
        let romData;
        if (index === 1) {
            romData = await this.loadRom(whatremains);
        } else {
            romData = await this.loadRom(tnot4s);
        }
        this.setState({selected: index, romData: romData});
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