import * as React from "react";
import DrumPad from "./drumpad.js";

export default class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyInput: ""
        }
        this.eventHandler = this.eventHandler.bind(this);
        this.resetKeyInput = this.resetKeyInput.bind(this);
    }
    componentDidMount(){
        window.addEventListener("keypress", this.eventHandler, 'false');
    }
    eventHandler(e){
        this.setState({
            keyInput: String.fromCharCode(e.keyCode)
        });
    }
    resetKeyInput(){
        this.setState({
            keyInput: ""
        });
    }
    render(){
        return (
            <div id="input-wrapper">
                {Object.keys(drumBank).map((e, index) => {
                    return <DrumPad 
                                key={index} id={index} name={drumBank[e].name} letter={drumBank[e].key} path={drumBank[e].soundPath}
                                pressedKey={this.state.keyInput} shareName={this.props.shareSoundName} resetInput={this.resetKeyInput}
                            />;
                })}
            </div>
        );
    }
}

const drumBank = {
    CIHat: {
        name: "CIHat",
        key: "Q"
    },
    Flam: {
        name: "Flam",
        key: "W"
    },
    Kick: {
        name: "Clap",
        key: "E"
    },
    OpHat: {
        name: "OpHat",
        key: "A"
    },
    PdHat: {
        name: "PdHat",
        key: "S"
    },
    Rim: {
        name: "Rim",
        key: "D"
    },
    SdSt: {
        name: "SdSt",
        key: "Z"
    },
    Snr: {
        name: "Snr",
        key: "X"
    },
    SnrOff: {
        name: "SnrOff",
        key: "C"
    }
}