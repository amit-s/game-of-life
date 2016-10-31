import React from 'react';

export default class BoardDimensionControls extends React.Component{
	render(){
		return(
			<div>
				<button data-columns={50} data-rows={30} onClick={(e)=>this.props.setBoardDimensions({rows: e.target.dataset.rows,columns: e.target.dataset.columns })}>50x30</button>
				<button data-columns={70} data-rows={50} onClick={(e)=>this.props.setBoardDimensions({rows: e.target.dataset.rows,columns: e.target.dataset.columns })}>70x50</button>
				<button data-columns={100} data-rows={80} onClick={(e)=>this.props.setBoardDimensions({rows: e.target.dataset.rows,columns: e.target.dataset.columns })}>100x80</button>
			</div>
			);
	}
}