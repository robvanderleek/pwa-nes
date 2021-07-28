import {NoUserSelectLabel} from "../Styles";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

export default function FileInput(props) {
    const {title, onDown, onUp, className, onClick, handleContent} = props;
    const classNames = `nes-btn ${className}`;
    const [file, setFile] = useState(undefined);

    useEffect(() => {
        function handleFile(event) {
            const content = event.target.result;
            handleContent(file.name, content);
        }

        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = handleFile;
            fileReader.readAsArrayBuffer(file);
        }
    }, [file, handleContent])

    function handleOnChange(event) {
        const firstFile = event.target.files[0];
        if (firstFile) {
            setFile(firstFile);
        }
    }

    return (
        <NoUserSelectLabel className={classNames}
                           onClick={onClick}
                           onMouseDown={() => onDown && onDown(title)}
                           onMouseUp={() => onUp && onUp(title)}
                           onTouchStart={() => onDown && onDown(title)}
                           onTouchEnd={() => onUp && onUp(title)}
        >
            <span>{title}</span>
            <input type="file" accept="application/*,.zip,.nes,.rom"
                   onChange={handleOnChange}/>
        </NoUserSelectLabel>
    );
}

FileInput.propTypes = {
    title: PropTypes.any.isRequired,
    onDown: PropTypes.func,
    onUp: PropTypes.func,
    className: PropTypes.string,
    onClick: PropTypes.func,
    handleContent: PropTypes.func
}