import {ChangeEvent, ReactNode, useEffect, useState} from "react";
import {SlotLabel} from "./RomButton.style";

interface FileInputProps {
    title: ReactNode;
    handleContent: (fileName: string, content: ArrayBuffer) => void;
}

export default function FileInput(props: FileInputProps) {
    const {title, handleContent} = props;
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        function handleFile(event: ProgressEvent<FileReader>) {
            const content = event.target?.result as ArrayBuffer;
            if (file && content) {
                handleContent(file.name, content);
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
        <SlotLabel className="nes-btn">
            <span>{title}</span>
            <input type="file" accept="application/zip,.nes"
                   onChange={handleOnChange}/>
        </SlotLabel>
    );
}

