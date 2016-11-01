import React from 'react';

export default class BoardDimensionControls extends React.Component{

	highlightButton(e){
		document.getElementById("smallBoardButton").className = "btn buttonWidth";
		document.getElementById("mediumBoardButton").className = "btn buttonWidth";
		document.getElementById("largeBoardButton").className = "btn buttonWidth";
		document.getElementById(e.target.id).className = "btn btn-danger buttonWidth";		
	}

	render(){
		return(
			<div className="text-center" onClick={this.highlightButton}>
				<button id="smallBoardButton" className="btn btn-danger buttonWidth" data-columns={50} data-rows={30} onClick={(e)=>this.props.setBoardDimensions({rows: e.target.dataset.rows,columns: e.target.dataset.columns })}>50 x 30</button>
				<button id="mediumBoardButton" className="btn buttonWidth" data-columns={70} data-rows={50} onClick={(e)=>this.props.setBoardDimensions({rows: e.target.dataset.rows,columns: e.target.dataset.columns })}>70 x 50</button>
				<button id="largeBoardButton" className="btn buttonWidth" data-columns={100} data-rows={80} onClick={(e)=>this.props.setBoardDimensions({rows: e.target.dataset.rows,columns: e.target.dataset.columns })}>100 x 80</button>
			</div>
			);
	}
}