import React, {Component} from "react";

export const RomContext = React.createContext({});

export class RomContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rom: undefined
        }
    }

    loadRom = (name) => {
        this.setState({rom: name});
    }

}