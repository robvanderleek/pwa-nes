import PropTypes from 'prop-types'
import './RightGamePad.css';

export default function RightGamePad(props) {
    const {touchController} = props;

    function renderButton(name) {
        return (
            <div className="btn-border">
                <div className="btn-round"
                     onMouseDown={() => touchController.handleButtonDown(name)}
                     onMouseUp={() => touchController.handleButtonUp(name)}
                     onTouchStart={() => touchController.handleButtonDown(name)}
                     onTouchEnd={() => touchController.handleButtonUp(name)}
                />
            </div>
        );
    }

    return (
        <div>
            {renderButton('B')}
            <div className="st-b">B</div>
            {renderButton('A')}
            <div className="st-a">A</div>
        </div>
    );
}

RightGamePad.propTypes = {
    touchController: PropTypes.object.isRequired
}