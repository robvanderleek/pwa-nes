import React, {Component} from "react";

export const RomContext = React.createContext({});

export class RomContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rom: undefined
        }
    }

    loadLocalRom = (name) => {
        console.log('LOADING: ' + name);
        this.setState({rom: name});
    }

    render() {
        const {children} = this.props;
        return (
            <RomContext.Provider value={{
                ...this.state,
                loadLocalRom: this.loadLocalRom
            }}>
                {children}
            </RomContext.Provider>
        );
    }

}