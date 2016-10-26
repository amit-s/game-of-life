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
			cells.push({
				number: i,
				isAlive: false
			});
		}
		return cells;
	}

	cellLifeHandler(e){
		let cellId = e.target.dataset.cellId-1;
		let cells = this.state.cells;

		cells[cellId].isAlive =  !cells[cellId].isAlive;
		this.setState({cells});

	}

	findNeighbors(e){
		this.cellLifeHandler(e);
		let arr = [],
		neighbors = [],
		cell = parseInt(e.target.dataset.cellId),
		totalCells = this.state.rows*this.state.columns;
		
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
			if((item === 0) || ((totalCells+item) % totalCells) === 0){
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
			<div>
				<div id="cellcontainer">
					{this.state.cells.map((cell,i)=>{
						let cellClass = cell.isAlive ? "cell alive" : "cell dead";
						return <div data-cell-id={i+1} className={cellClass} onClick={(e)=>this.findNeighbors(e)} key={i+1}>{cell.number+1}</div>;
					})}
				</div>
				<button>Next Generation</button>
			</div>
			);
	}
}