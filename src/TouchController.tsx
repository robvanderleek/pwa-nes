import {ButtonKey, Controller, ControllerId} from "jsnes";


export default class TouchController {
    private static KEYS: { [key: string]: [ControllerId, ButtonKey] } = {
        'A': [1, Controller.BUTTON_A],
        'B': [1, Controller.BUTTON_B],
        'Select': [1, Controller.BUTTON_SELECT],
        'Start': [1, Controller.BUTTON_START],
        'Up': [1, Controller.BUTTON_UP],
        'Down': [1, Controller.BUTTON_DOWN],
        'Left': [1, Controller.BUTTON_LEFT],
        'Right': [1, Controller.BUTTON_RIGHT]
    };

    onButtonUpCallback: ((controller: ControllerId, button: ButtonKey) => void) | undefined;
    onButtonDownCallback: ((controller: ControllerId, button: ButtonKey) => void) | undefined;

    setOnButtonDown = (func: (controller: ControllerId, button: ButtonKey) => void) => {
        this.onButtonDownCallback = func;
    }

    setOnButtonUp = (func: (controller: ControllerId, button: ButtonKey) => void) => {
        this.onButtonUpCallback = func;
    }

    handleButtonDown = (name: string) => {
        const key = TouchController.KEYS[name];
        if (key && this.onButtonDownCallback) {
            this.onButtonDownCallback(key[0], key[1]);
        }
    };

    handleButtonUp = (name: string) => {
        const key = TouchController.KEYS[name];
        if (key && this.onButtonUpCallback) {
            this.onButtonUpCallback(key[0], key[1]);
        }
    };

}
