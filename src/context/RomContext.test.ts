import {deleteRomFromLocalStorage, getVersion, saveRomToLocalStorage, setVersion} from "./RomContext";

class LocalStorageMock {
    constructor(private store: Record<string, string> = {}) {
    }

    clear() {
        this.store = {};
    }

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: any) {
        this.store[key] = value.toString();
    }

    removeItem(key: string) {
        delete this.store[key];
    }
}

beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: new LocalStorageMock()});
});

test('save a rom to a slot', () => {
    expect(window.localStorage.getItem('SLOT_0')).toBeNull();

    const rom = {name: 'DonkeyK.nes', data: new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).buffer};

    saveRomToLocalStorage(0, rom);

    expect(window.localStorage.getItem('SLOT_0')).toBeDefined();
});

test('get and set version', () => {
    expect(getVersion()).toBeNull();

    setVersion();

    expect(getVersion()).toBeDefined();
});

test('remove rom', () => {
    const rom = {name: 'DonkeyK.nes', data: new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).buffer};

    saveRomToLocalStorage(0, rom);

    expect(window.localStorage.getItem('SLOT_0')).toBeDefined();

    deleteRomFromLocalStorage(0);

    expect(window.localStorage.getItem('SLOT_0')).toBeNull();
});