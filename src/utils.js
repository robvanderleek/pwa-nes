export function prettifyRomName(name) {
    if (name.toLowerCase().endsWith(".nes") || name.toLowerCase().endsWith(".zip")) {
        name = name.substr(0, name.length - 4);
    }
    if (name.length > 10) {
        if (countUppercase(name) > 1) {
            return [...name].filter(c => isUpperCase(c)).join('').substr(0, 10);
        } else {
            name = name.substr(0, 10);
        }
    }
    name = name.replace(/[^0-9a-z]/gi, '');
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export function countUppercase(s) {
    return [...s].reduce((p, c) => isUpperCase(c) ? p + 1 : p, 0);
}

function isUpperCase(char) {
    return (char >= 'A') && (char <= 'Z');
}
