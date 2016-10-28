import React from 'react';

export default class GameControls extends React.Component{
	render(){
		return(
			<div>
				<div id="gameControls">
					<button onClick={this.props.startsim} >Start</button>
					<button onClick={this.props.stopsim} >Stop</button>
					<button onClick={this.props.nextgen} >Next Generation</button>
					<button onClick={this.props.clearSim} >Clear</button>
				</div>
				<div id="speedControls">
					<button data-speed={1000} onClick={(e)=>this.props.setSpeed(e.target.dataset.speed)}>Slow</button>
					<button data-speed={500} onClick={(e)=>this.props.setSpeed(e.target.dataset.speed)}>Medium</button>
					<button data-speed={100} onClick={(e)=>this.props.setSpeed(e.target.dataset.speed)}>Fast</button>
				</div>
			</div>
			);
	}
}