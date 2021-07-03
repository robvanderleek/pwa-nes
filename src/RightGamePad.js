import PropTypes from 'prop-types'
import './RightGamePad.css';

export default function RightGamePad(props) {
    const {touchController} = props;

    function renderButton(name) {
        return (
            <div className="btn-round"
                 onMouseDown={() => touchController.handleButtonDown(name)}
                 onMouseUp={() => touchController.handleButtonUp(name)}
                 onTouchStart={() => touchController.handleButtonDown(name)}
                 onTouchEnd={() => touchController.handleButtonUp(name)}
            />
        );
    }

    return (
        <div className="controller">
            <div className="decoration">
                <div className="stickers">
                    <div className="st-a">A</div>
                    <div className="st-b">B</div>
                </div>
            </div>
            <div className="buttons-a-b">
                <div className="btn-border">
                    {renderButton('B')}
                </div>
                <div className="btn-border">
                    {renderButton('A')}
                </div>
            </div>
        </div>
    );
}

RightGamePad.propTypes = {
    touchController: PropTypes.object.isRequired
}