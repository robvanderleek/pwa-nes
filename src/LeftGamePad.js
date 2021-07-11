import './LeftGamePad.css';
import PropTypes from "prop-types";

export default function LeftGamePad(props) {
    const {touchController} = props;

    function renderLfArrow(name) {
        return (
            <div style={{position: 'absolute', right: 0, width: '32px', height: '100%'}}
                 onMouseDown={() => touchController.handleButtonDown(name)}
                 onMouseUp={() => touchController.handleButtonUp(name)}
                 onTouchStart={() => touchController.handleButtonDown(name)}
                 onTouchEnd={() => touchController.handleButtonUp(name)}
            >
                <div className="arrowlf"/>
            </div>
        );
    }

    function renderRhArrow(name) {
        return (
            <div style={{position: 'absolute', left: 0, width: '32px', height: '100%'}}
                 onMouseDown={() => touchController.handleButtonDown(name)}
                 onMouseUp={() => touchController.handleButtonUp(name)}
                 onTouchStart={() => touchController.handleButtonDown(name)}
                 onTouchEnd={() => touchController.handleButtonUp(name)}
            >
                <div className="arrowrh"/>
            </div>
        );
    }

    return (
        <div style={{width: '110px', height: '110px', transform: 'scale(2)'}}>
            <div className="cross">
                <div className="circle"></div>
                <div className="horizontal">
                    {renderLfArrow('Right')}
                    {renderRhArrow('Left')}
                </div>
                <div className="vertical">
                    {renderLfArrow('Down')}
                    {renderRhArrow('Up')}
                </div>
                <div className="back-cross">
                    <div className="horiz"></div>
                    <div className="vert"></div>
                </div>
            </div>
        </div>
    );
}

LeftGamePad.propTypes = {
    touchController: PropTypes.object.isRequired
}