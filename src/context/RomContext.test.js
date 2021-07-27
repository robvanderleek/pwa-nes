import {RomContextProvider} from "./RomContext";
import {shallow} from "enzyme";

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {value: new LocalStorageMock()});
});

it('should save a rom to a slot', function () {
    const provider = shallow(<RomContextProvider/>).instance();

    expect(window.localStorage.getItem('SLOT_0')).toBeNull();

    provider.saveRomSlot(0, 'DonkeyK.nes', '0123456789abcdef');

    expect(window.localStorage.getItem('SLOT_0')).toBeDefined();
});