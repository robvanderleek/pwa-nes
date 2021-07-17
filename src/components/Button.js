import {StyledButton} from "../Styles";
import PropTypes from "prop-types";

export default function Button(props) {
    const {title, onDown, onUp, active, className, onClick} = props;
    const classNames = active ? `nes-btn is-success ${className}` : `nes-btn ${className}`;
    return (
        <StyledButton className={classNames}
                      onClick={onClick}
                      onMouseDown={() => onDown && onDown(title)}
                      onMouseUp={() => onUp && onUp(title)}
                      onTouchStart={() => onDown && onDown(title)}
                      onTouchEnd={() => onUp && onUp(title)}
        >{title}</StyledButton>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onDown: PropTypes.func,
    onUp: PropTypes.func,
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
}