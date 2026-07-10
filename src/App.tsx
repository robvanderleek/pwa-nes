import {LargeMessage, Main} from "./Styles";
import LoadRom from "./views/LoadRom";
import Game from "./views/Game";
import {useDeviceOrientation} from "./context/DeviceOrientationContext";
import {useRomContext} from "./context/RomContext";

export default function App() {
    const romContext = useRomContext();
    const {initializing, isTouchDevice, orientation} = useDeviceOrientation();

    if (initializing) {
        return null;
    } else if (isTouchDevice) {
        if (orientation === 'portrait') {
            return (<LoadRom/>);
        } else {
            if (romContext.selected !== undefined) {
                return (<Game/>);
            } else {
                return (<Main><LargeMessage>Rotate to select a ROM to play</LargeMessage></Main>);
            }
        }
    } else {

        if (romContext.selected === null) {
            return (<LoadRom/>);
        } else {
            return (<Game/>);
        }
    }
}