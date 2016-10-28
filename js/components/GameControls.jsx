import React from 'react';

export default class GameControls extends React.Component{
	render(){
		return(
			<div>
				<button onClick={this.props.startsim} >Start</button>
				<button onClick={this.props.stopsim} >Stop</button>
				<button onClick={this.props.nextgen} >Next Generation</button>
				<button onClick={this.props.clearSim} >Clear</button>
			</div>
			);
	}
}