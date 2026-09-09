import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import streemerzUrl from "../static/streemerz-v02.zip?url";
import {unzip} from "unzipit";
import {prettifyRomName} from "../utils";
import Version from "../version";

interface RomContextValue {
    selected: number | null;
    slots: (Rom | undefined)[];
    addRom: (index: number, name: string, data: ArrayBuffer) => Promise<void>;
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
            let slot0 = loadRomFromLocalStorage(0);
            if (slot0 === undefined || slot0.name !== 'Streemerz' || !isUpToDate()) {
                const res = await fetch(streemerzUrl);
                const buffer: ArrayBuffer = await res.arrayBuffer();
                const romData = await loadZippedRomData(buffer);
                const rom: Rom = {name: prettifyRomName('Streemerz'), data: romData};
                saveRomToLocalStorage(0, rom);
            }
            setSlots([slot0, loadRomFromLocalStorage(1), loadRomFromLocalStorage(2)]);
        }
        init();
    }, []);

    const loadZippedRomData = async (data: ArrayBuffer): Promise<ArrayBuffer> => {
        const unzipped = await unzip(data);
        const firstEntry = Object.keys(unzipped.entries)[0];
        return await unzipped.entries[firstEntry].arrayBuffer();
    }


    const isUpToDate = () => {
        const storedVersion = getVersion();
        const version = Version.gitSha.substring(0, 7);
        if (storedVersion === null || storedVersion !== version) {
            console.log('New version loaded');
            setVersion();
            return false;
        }
        return true;
    }


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

    const addRom = async (index: number, name: string, data: ArrayBuffer) => {
        if (name.toLowerCase().endsWith(".zip")) {
            const romData = await loadZippedRomData(data);
            const rom: Rom = {name: prettifyRomName(name), data: romData};
            saveRomToLocalStorage(index, rom);
            const updatedSlots = structuredClone(slots);
            updatedSlots[index] = rom;
            setSlots(updatedSlots);
        } else {
            const rom: Rom = {name: prettifyRomName(name), data: data};
            saveRomToLocalStorage(index, rom);
            const updatedSlots = structuredClone(slots);
            updatedSlots[index] = rom;
            setSlots(updatedSlots);
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

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return array.buffer;
}

export function loadRomFromLocalStorage(index: number): Rom | undefined {
    const item = localStorage.getItem(`SLOT_${index}`);
    if (item) {
        const json = JSON.parse(item);
        return {...json, data: base64ToArrayBuffer(json.data)};
    } else {
        return undefined;
    }
}

const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer): string => {
    const array = new Uint8Array(arrayBuffer);
    let result = "";
    for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i]);
    }
    return btoa(result);
}

export function saveRomToLocalStorage(index: number, rom: Rom) {
    localStorage.setItem(`SLOT_${index}`, JSON.stringify({...rom, data: arrayBufferToBase64(rom.data)}));
}

export function deleteRomFromLocalStorage(index: number) {
    localStorage.removeItem(`SLOT_${index}`);
}

export function getVersion() {
    return localStorage.getItem('PWA_NES_VERSION');
}

export function setVersion() {
    return localStorage.setItem('PWA_NES_VERSION', Version.gitSha.substring(0, 7));
}