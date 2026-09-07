import './LeftGamePad.css';
import TouchController, {ControllerButton} from "./TouchController";

export default function LeftGamePad(props: { touchController: TouchController }) {
    const {touchController} = props;

    function renderLfArrow(button: ControllerButton) {
        return (
            <div style={{position: 'absolute', right: 0, width: '32px', height: '100%'}}
                 onMouseDown={() => touchController.handleButtonDown(button)}
                 onMouseUp={() => touchController.handleButtonUp(button)}
                 onTouchStart={() => touchController.handleButtonDown(button)}
                 onTouchEnd={() => touchController.handleButtonUp(button)}
            >
                <div className="arrowlf"/>
            </div>
        );
    }

    function renderRhArrow(button: ControllerButton) {
        return (
            <div style={{position: 'absolute', left: 0, width: '32px', height: '100%'}}
                 onMouseDown={() => touchController.handleButtonDown(button)}
                 onMouseUp={() => touchController.handleButtonUp(button)}
                 onTouchStart={() => touchController.handleButtonDown(button)}
                 onTouchEnd={() => touchController.handleButtonUp(button)}
            >
                <div className="arrowrh"/>
            </div>
        );
    }

    return (
        <div style={{width: '110px', height: '110px', transform: 'scale(1.8)'}}>
            <div className="cross">
                <div className="circle"></div>
                <div className="horizontal">
                    {renderLfArrow('right')}
                    {renderRhArrow('left')}
                </div>
                <div className="vertical">
                    {renderLfArrow('down')}
                    {renderRhArrow('up')}
                </div>
                <div className="back-cross">
                    <div className="horiz"></div>
                    <div className="vert"></div>
                </div>
            </div>
        </div>
    );
}