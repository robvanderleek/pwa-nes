import './RightGamePad.css';
import TouchController from "./TouchController";

interface RightGamePasProps {
    touchController: TouchController;
}

export default function RightGamePad(props: RightGamePasProps) {
    const {touchController} = props;

    function renderButton(name: string) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', transform: 'scale(1.5)'}}>
                <div className="btn-border"
                     onMouseDown={() => touchController.handleButtonDown(name)}
                     onMouseUp={() => touchController.handleButtonUp(name)}
                     onTouchStart={() => touchController.handleButtonDown(name)}
                     onTouchEnd={() => touchController.handleButtonUp(name)}>
                    <div className="btn-round"/>
                </div>
                <div className="sticker">{name}</div>
            </div>
        );
    }

    return (
        <div style={{display: 'flex', gap: '48px'}}>
            {renderButton('B')}
            {renderButton('A')}
        </div>
    );
}