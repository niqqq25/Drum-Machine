import * as React from "react";
const drumSounds = require("../DrumSounds/*.wav");

export default class DrumPad extends React.Component{
    constructor(props){
        super(props);
        this.playAudio = this.playAudio.bind(this);
    }
    componentDidUpdate(){
        if((this.props.pressedKey == this.props.letter.toLowerCase()) || (this.props.pressedKey == this.props.letter)){
           this.playAudio();
        }
    }
    playAudio(){
        const audioElement = document.getElementById(this.props.letter);
        audioElement.currentTime = 0;
        audioElement.play();
        this.addButtonClickEffect();
        this.props.shareName(this.props.name);
        this.props.resetInput();
    }
    addButtonClickEffect(){
        const drumPadElement = document.getElementById(this.props.id);
        drumPadElement.className += " clicked";
        setTimeout(function(){
            drumPadElement.className = drumPadElement.className.replace(" clicked","");
        }, 200);
    }
    render() {
        return(
            <a id={this.props.id} className="drum-pad" onClick={this.playAudio}>
                {this.props.letter}
                <audio id={this.props.letter} src={drumSounds[this.props.name]} type="audio/wav" className="clip"></audio>
            </a>
        );
    }
}