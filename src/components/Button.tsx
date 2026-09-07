import {NoUserSelectButton} from "../Styles";
import TouchController, {ControllerButton} from "../TouchController";

interface ButtonProps {
    touchController: TouchController;
    controllerButton: ControllerButton;
    active?: boolean;
    className?: string;
}

export default function Button(props: ButtonProps) {
    const {touchController, controllerButton, active, className} = props;
    const classNames = active ? `nes-btn is-success ${className}` : `nes-btn ${className}`;
    return (
        <NoUserSelectButton className={classNames}
                            onClick={() => touchController.handleButtonClick(controllerButton)}
                            onMouseDown={() => touchController.handleButtonDown(controllerButton)}
                            onMouseUp={() => touchController.handleButtonUp(controllerButton)}
                            onTouchStart={() => touchController.handleButtonDown(controllerButton)}
                            onTouchEnd={() => touchController.handleButtonUp(controllerButton)}
        >{controllerButton}</NoUserSelectButton>
    );
}

