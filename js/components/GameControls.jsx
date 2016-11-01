import React from 'react';

export default class GameControls extends React.Component{

	gameControlsHighlight(e){
		if((e.target.id === 'startButton') || (e.target.id === 'stopButton')){
			document.getElementById("startButton").className = "btn";
			document.getElementById("stopButton").className = "btn";		
			document.getElementById(e.target.id).className = "btn btn-danger";
		}
		if(e.target.id === 'clearButton'){
			document.getElementById("startButton").className = "btn";
			document.getElementById("stopButton").className = "btn";			
		}
		/*if(this.props.status){
			document.getElementById("startButton").className = "btn btn-danger";
		}*/

	}

	speedControlsHighlight(e){
		document.getElementById("slowSpeedButton").className = "btn buttonWidth";
		document.getElementById("mediumSpeedButton").className = "btn buttonWidth";
		document.getElementById("fastSpeedButton").className = "btn buttonWidth";
		document.getElementById(e.target.id).className = "btn btn-danger buttonWidth";
	}

	render(){
		
		return(
			<div>
				<div className="bx text-center" id="gameControls" onClick={this.gameControlsHighlight}>
					<button ref="startButton" id="startButton" className="btn btn-danger" onClick={this.props.startsim} >Start</button>
					<button id="stopButton" className="btn" onClick={this.props.stopsim} >Stop</button>
					<button id="nextgenButton" className="btn" onClick={this.props.nextgen} >Next Generation</button>
					<button id="clearButton" className="btn" onClick={this.props.clearSim} >Clear</button>
				</div>
				<div className="bx text-center" id="speedControls" onClick={this.speedControlsHighlight}>
					<button id="slowSpeedButton" className="btn buttonWidth" data-speed={1000} onClick={(e)=>this.props.setSpeed(e.target.dataset.speed)}>Slow</button>
					<button id="mediumSpeedButton" className="btn btn-danger buttonWidth" data-speed={400} onClick={(e)=>this.props.setSpeed(e.target.dataset.speed)}>Medium</button>
					<button id="fastSpeedButton" className="btn buttonWidth" data-speed={150} onClick={(e)=>this.props.setSpeed(e.target.dataset.speed)}>Fast</button>
				</div>
			</div>
			);
	}
}