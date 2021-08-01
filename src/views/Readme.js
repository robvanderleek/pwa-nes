import {Portrait, Section} from "./LoadRom";
import Hyperlink from "../components/Hyperlink";

export default function Readme() {
    return (
        <Portrait>
            <Section>This is a Progressive Web App ✨</Section>
            <Section>
                If you're on iOS: in Safari tap the Share button in the browser and select "Add to Home Screen"
            </Section>
            <Section>
                If you're on Android tap the ⋮ button next to the address field and select "Add to Home screen" in the
                list
                of options that appears
            </Section>
            <Section>
                <Hyperlink href="https://github.com/robvanderleek/pwa-nes/issues">
                    Click here to open an issue for bugs 🐛 or other feedback.
                </Hyperlink>
            </Section>
            <Section>Click anywhere on this screen to go back</Section>
        </Portrait>
    );
}