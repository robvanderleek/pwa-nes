import {Controller} from "jsnes";

const KEYS = {
    'A': [1, Controller.BUTTON_A],
    'B': [1, Controller.BUTTON_B],
    'Select': [1, Controller.BUTTON_SELECT],
    'Start': [1, Controller.BUTTON_START],
    'Up': [1, Controller.BUTTON_UP],
    'Down': [1, Controller.BUTTON_DOWN],
    'Left': [1, Controller.BUTTON_LEFT],
    'Right': [1, Controller.BUTTON_RIGHT]
};

export default class TouchController {
    constructor() {
        this.keys = KEYS;
    }

    setOnButtonDown = (val) => {
        this.onButtonDownCallback = val;
    }

    setOnButtonUp = (val) => {
        this.onButtonUpCallback = val;
    }

    handleButtonDown = name => {
        const key = this.keys[name];
        if (key) {
            this.onButtonDownCallback(key[0], key[1]);
        }
    };

    handleButtonUp = name => {
        const key = this.keys[name];
        if (key) {
            this.onButtonUpCallback(key[0], key[1]);
        }
    };

}
