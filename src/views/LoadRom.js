import {Message, Portrait} from "../Styles";
import Button from "../components/Button";

export default function LoadRom() {
    return (
        <Portrait>
            <Message>Select ROM</Message>
            <Button title="What Remains" active/>
            <Button title="TNOTFS"/>
            <Button title="Load ROM"/>
            <Message>Rotate device to play!</Message>
        </Portrait>
    );
}