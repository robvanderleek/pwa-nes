import {NoUserSelectLabel} from "../Styles";
import {ChangeEvent, ReactNode, useEffect, useState} from "react";

interface FileInputProps {
    title: ReactNode;
    onDown: (title: string) => void;
    onUp: (title: string) => void;
    className: string;
    onClick: () => void;
    handleContent: (fileName: string, content: string) => void;
}

export default function FileInput(props: FileInputProps) {
    const {title, onDown, onUp, className, onClick, handleContent} = props;
    const classNames = `nes-btn ${className}`;
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        function handleFile(event: ProgressEvent<FileReader>) {
            const content = event.target?.result;
            if (file && content) {
                handleContent(file.name, content.toString());
            }
        }

        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = handleFile;
            fileReader.readAsArrayBuffer(file);
        }
    }, [file, handleContent])

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) {
            const firstFile = files[0];
            if (firstFile) {
                setFile(firstFile);
            }
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
            <input type="file" accept="application/zip"
                   onChange={handleOnChange}/>
        </NoUserSelectLabel>
    );
}

