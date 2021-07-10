import PropTypes from 'prop-types'
import './RightGamePad.css';

export default function RightGamePad(props) {
    const {touchController} = props;

    function renderButton(name) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
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
        <div style={{display: 'flex', gap: '24px'}}>
            {renderButton('B')}
            {renderButton('A')}
        </div>
    );
}

RightGamePad.propTypes = {
    touchController: PropTypes.object.isRequired
}