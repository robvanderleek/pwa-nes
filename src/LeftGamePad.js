import './LeftGamePad.css';
import PropTypes from "prop-types";

export default function LeftGamePad(props) {
    const {touchController} = props;

    function renderArrow(className, name) {
        return (
            <div className={className}
                 onMouseDown={() => touchController.handleButtonDown(name)}
                 onMouseUp={() => touchController.handleButtonUp(name)}
                 onTouchStart={() => touchController.handleButtonDown(name)}
                 onTouchEnd={() => touchController.handleButtonUp(name)}
            />
        );
    }

    return (
        <div className="cross">
            <div className="circle"></div>
            <div className="horizontal">
                {renderArrow('arrowlf', 'Right')}
                {renderArrow('arrowrh', 'Left')}
            </div>
            <div className="vertical">
                {renderArrow('arrowlf', 'Down')}
                {renderArrow('arrowrh', 'Up')}
            </div>
            <div className="back-cross">
                <div className="horiz"></div>
                <div className="vert"></div>
            </div>
        </div>
    );
}

LeftGamePad.propTypes = {
    touchController: PropTypes.object.isRequired
}