import React from 'react';

export default class Board extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			cells: this.createCells(100),
			rows: 5,
			columns: 20,			
		};		
	}

	createCells(count){
		let cells=[];
		for(let i=0; i<count; i++){
			cells.push(i);
		}
		return cells;
	}

	findNeighbors(e){
		let arr = [];
		let neighbors = [];		
		let cell = parseInt(e.target.dataset.cellId);
		let totalCells = this.state.rows*this.state.columns;

		arr.push(cell);

		if (((cell+1) % this.state.columns) === 1){
			arr.push(cell + 1 - this.state.columns);
		}else{
			arr.push(cell+1);
		}

		if(((cell-1)%this.state.columns) === 0){
			arr.push(cell - 1 + this.state.columns);
		}else{
			arr.push(cell-1);
		}

		arr.forEach((item)=>{
			neighbors.push(item);
			neighbors.push(item-this.state.columns);
			neighbors.push(item+this.state.columns);
		});

		
		neighbors = neighbors.map((item)=>{
				if(item===0){
					return 100;
				}else{
					return ((totalCells+item) % totalCells);
				}
		});
		console.log(neighbors);
		neighbors.shift();
		return neighbors;
	}

	render(){
		
		return(
			<div id="cellhold">
				{this.state.cells.map((cell,i)=><div data-cell-id={i+1} className="cell" onClick={(e)=>this.findNeighbors(e)} key={i+1}>{cell+1}</div>)}
			</div>
			);
	}
}