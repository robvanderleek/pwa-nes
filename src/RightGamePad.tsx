import './RightGamePad.css';
import TouchController, {ControllerButton} from "./TouchController";

interface RightGamePasProps {
    touchController: TouchController;
}

export default function RightGamePad(props: RightGamePasProps) {
    const {touchController} = props;

    function renderButton(button: ControllerButton) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', transform: 'scale(1.5)'}}>
                <div className="btn-border"
                     onMouseDown={() => touchController.handleButtonDown(button)}
                     onMouseUp={() => touchController.handleButtonUp(button)}
                     onTouchStart={() => touchController.handleButtonDown(button)}
                     onTouchEnd={() => touchController.handleButtonUp(button)}>
                    <div className="btn-round"/>
                </div>
                <div className="sticker">{button}</div>
            </div>
        );
    }

    return (
        <div style={{display: 'flex', gap: '48px'}}>
            {renderButton('b')}
            {renderButton('a')}
        </div>
    );
}