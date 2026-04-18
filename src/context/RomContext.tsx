import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import streemerz from "../static/streemerz-v02.zip";
import {unzip} from "unzipit";
import {prettifyRomName} from "../utils";
import Version from "../version";

interface RomContextValue {
    selected: number | null;
    slots: (Rom | undefined)[];
    addRom: (index: number, name: string, data: string) => Promise<void>;
    removeRom: (index: number) => void;
    selectSlot: (index: number) => void;
    unselectSlot: () => void;
    updateSlot: (index: number, json: any) => void;
}

const RomContext = createContext({} as RomContextValue);

export const RomContextProvider = (props: { children?: ReactNode }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [slots, setSlots] = useState<Array<Rom | undefined>>([]);

    useEffect(() => {
        const init = async () => {
            const loadedSlots = [loadSlot(0), loadSlot(1), loadSlot(2)];
            if (slots[0] === undefined || slots[0].name !== 'Streemerz' || !isUpToDate()) {
                const romData = await loadZippedRomData(streemerz);
                saveSlot(0, 'Streemerz', romData);
            }
        }
        init();
    });

    const loadZippedRomData = async (data: string): Promise<string> => {
        const unzipped = await unzip(data);
        const firstEntry = Object.keys(unzipped.entries)[0];
        return arrayBufferToString(await unzipped.entries[firstEntry].arrayBuffer());
    }

    const arrayBufferToString = (arrayBuffer: ArrayBuffer): string => {
        const array = new Int8Array(arrayBuffer);
        let result = "";
        for (let i = 0; i < array.length; i++) {
            result += String.fromCharCode(array[i]);
        }
        return result
    }

    const getVersion = () => {
        return localStorage.getItem('PWA_NES_VERSION');
    }

    const setVersion = () => {
        return localStorage.setItem('PWA_NES_VERSION', Version.revision);
    }

    const isUpToDate = () => {
        const storedVersion = getVersion();
        const version = Version.revision;
        if (storedVersion === null || storedVersion !== version) {
            console.log('New version loaded');
            setVersion();
            return false;
        }
        return true;
    }

    const loadSlot = (index: number): string | undefined => {
        const item = localStorage.getItem(`SLOT_${index}`);
        if (item) {
            return JSON.parse(item);
        } else {
            return undefined;
        }
    }

    const saveSlot = (index: number, name: string, data: string) => {
        const rom: Rom = {name: prettifyRomName(name), data: data};
        saveRomToLocalStorage(index, rom);
        const updatedSlots = structuredClone(slots);
        updatedSlots[index] = rom;
        setSlots(updatedSlots);
    }

    const saveRomToLocalStorage = (index: number, rom: Rom) => localStorage.setItem(`SLOT_${index}`,
        JSON.stringify(rom));

    const updateSlot = (index: number, json: any) => {
        const updatedSlots = structuredClone(slots);
        const rom = updatedSlots[index];
        if (rom !== undefined) {
            rom.cpu = json.cpu;
            rom.ppu = json.ppu;
            rom.mmap = json.mmap;
            setSlots(updatedSlots);
            saveRomToLocalStorage(index, rom);
        }
    }

    const unselectSlot = () => setSelected(null);

    const addRom = async (index: number, name: string, data: string) => {
        if (name.toLowerCase().endsWith(".zip")) {
            const romData = await loadZippedRomData(data);
            saveSlot(index, name, romData);
        } else {
            // const romData = arrayBufferToString(data);
            saveSlot(index, name, data);
        }
        setSelected(index);
    }

    const removeRom = (index: number) => {
        localStorage.removeItem(`SLOT_${index}`);
        const updatedSlots = structuredClone(slots);
        updatedSlots[index] = undefined;
        if (index === selected) {
            setSelected(null);
        }
        setSlots(updatedSlots);
    }

    return (
        <RomContext.Provider value={{
            selected,
            slots,
            addRom,
            removeRom,
            selectSlot: setSelected,
            unselectSlot,
            updateSlot
        }}>
            {props.children}
        </RomContext.Provider>
    );

}

export const useRomContext = () => useContext(RomContext);