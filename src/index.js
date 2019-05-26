import * as React from "react";
import * as ReactDOM from "react-dom";
import Display from "./display.js";
import Input from "./input.js";

class DrumMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            soundName: ""
        }
        this.eventHandler = this.eventHandler.bind(this);
    }
    eventHandler(name){
        if(name != this.state.soundName){
            this.setState({
                soundName: name
            });
        }
    }
    render(){
        return (
            <div id="drum-machine">
                <h1>Drum Machine</h1>
                <Display value={this.state.soundName}/>
                <Input shareSoundName={this.eventHandler}/>
            </div>
        );
    }
}

ReactDOM.render(
    <DrumMachine />,
    document.getElementById("app")
);