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

function Display(props){
    return <div id="display">{props.value}</div>;
}

class Input extends React.Component{
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
                                id={index} name={drumBank[e].name} letter={drumBank[e].key} path={drumBank[e].soundPath}
                                pressedKey={this.state.keyInput} shareName={this.props.shareSoundName} resetInput={this.resetKeyInput}
                            />;
                })}
            </div>
        );
    }
}

class DrumPad extends React.Component{
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
                <audio id={this.props.letter} src={"./DrumSounds/" + this.props.name + ".wav"} type="audio/wav" className="clip"></audio>
            </a>
        );
    }
}

ReactDOM.render(
    <DrumMachine />,
    document.getElementById("app")
);