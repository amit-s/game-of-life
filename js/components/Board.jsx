import React from 'react';

export default class Board extends React.Component{
	constructor(props){
		super(props);
		let initialCells = this.createCells(100);

		this.state = {
			cells: initialCells,
			rows: 5,
			columns: 20,
			generation: 0
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

	findNeighbors(index){
		let arr = [],
		neighbors = [],
		cell = index+1,
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
		/*console.log(neighbors);*/
		neighbors.shift();
		return neighbors;
	}

	conwayRules(){
		let cellsNew = this.state.cells.map((cell)=>Object.assign({},cell));
		let cellsState = this.state.cells;		

		cellsNew.forEach((cell,index)=>{
			let neighbors = this.findNeighbors(index);
			let countAlive = 0;

			neighbors.forEach((item)=>{
				if(cellsState[item-1].isAlive){
					countAlive++;
				}
			});

			if(!cellsState[index].isAlive && countAlive===3){
				cell.isAlive=true;
			}
			if(cellsState[index].isAlive && (countAlive<2 || countAlive>3)){
				cell.isAlive=false;
			}
			if(cellsState[index].isAlive && (countAlive===2 || countAlive===3)){
				cell.isAlive=true;
			}			

			this.setState({cells: cellsNew});
		});
	}

	render(){
		return(
			<div>
				<div id="cellcontainer">
					{this.state.cells.map((cell,i)=>{
						let cellClass = cell.isAlive ? "cell alive" : "cell dead";
						return <div data-cell-id={i+1} className={cellClass} onClick={(e)=>this.cellLifeHandler(e)} key={i+1}>{cell.number+1}</div>;
					})}
				</div>
				<button onClick={()=>this.conwayRules()}>Next Generation</button>
			</div>
			);
	}
}