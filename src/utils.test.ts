import {countUppercase, prettifyRomName} from "./utils";

test('prettify rom name', () => {
    expect(prettifyRomName('Streemerz')).toBe('Streemerz');
    expect(prettifyRomName('DonkeyK.nes')).toBe('DonkeyK');
    expect(prettifyRomName('SuperMarioBros.nes')).toBe('SMB');
    expect(prettifyRomName('streemerz-v02.nes')).toBe('Streemerz v0');
});

test('count uppercase', () => {
    expect(countUppercase('A')).toBe(1);
    expect(countUppercase('AZ')).toBe(2);
    expect(countUppercase('az')).toBe(0);
    expect(countUppercase('SuperMarioBros')).toBe(3);
});