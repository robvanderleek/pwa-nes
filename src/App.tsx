import {LargeMessage, Main} from "./Styles";
import LoadRom from "./views/LoadRom";
import Game from "./views/Game";
import {useDeviceOrientation} from "./context/DeviceOrientationContext";
import {useRomContext} from "./context/RomContext";

export default function App() {
    const romContext = useRomContext();
    const {initializing, isTouchDevice, orientation} = useDeviceOrientation();

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
        // return renderNonTouchDevice();
        if (romContext.selected !== undefined) {
            console.log("Selected ROM:", romContext.slots);
            return (<Game/>);
        } else {
            return renderNoRomSelected();
        }
    }
}