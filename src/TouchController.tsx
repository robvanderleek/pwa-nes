import {Nostalgist} from "nostalgist";

export type ControllerButton = 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'select' | 'start';

export default class TouchController {
    private nostalgist: Nostalgist | null = null;

    setNostalgist(nostalgist: Nostalgist) {
        this.nostalgist = nostalgist;
    }

    handleButtonDown = (button: ControllerButton) => {
        if (this.nostalgist) {
            this.nostalgist.pressDown(button);
        }
    };

    handleButtonUp = (button: ControllerButton) => {
        if (this.nostalgist) {
            this.nostalgist.pressUp(button);
        }
    };

    handleButtonClick = async (button: ControllerButton) => {
        if (this.nostalgist) {
            await this.nostalgist.press(button);
        }
    }

}
