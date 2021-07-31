import {useContext} from "react";
import {LargeMessage, Main} from "./Styles";
import LoadRom from "./views/LoadRom";
import {RomContext} from "./context/RomContext";
import Game from "./views/Game";
import {DeviceOrientationContext} from "./context/DeviceOrientationContext";

export default function App() {
    const romContext = useContext(RomContext);
    const {initializing, isTouchDevice, orientation} = useContext(DeviceOrientationContext);

    const renderNonTouchDevice = () => <Main><LargeMessage>Please view this on a mobile device</LargeMessage></Main>;

    const renderNoRomSelected = () => <Main><LargeMessage>Rotate to select a ROM to play</LargeMessage></Main>;

    if (initializing) {
        return null;
    } else if (isTouchDevice) {
        if (orientation === 'portrait') {
            return (<LoadRom/>);
        } else {
            if (romContext.selected !== undefined) {
                return (<Game/>);
            } else {
                return renderNoRomSelected();
            }
        }
    } else {
        return renderNonTouchDevice();
    }
}