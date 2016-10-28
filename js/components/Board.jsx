import React from 'react';
import GameControls from './GameControls.jsx';

export default class Board extends React.Component{
	constructor(props){
		super(props);
		let initialCells = this.createCells(1000);

		this.state = {
			cells: initialCells,			
			rows: 25,
			columns: 40,
			height: 0,
			width: 0,			
			game: {
				isRunning: false,
				currentGeneration: 0
			}
		}
	}

	createCells(count){
		let cells=[];
		for(let i=0; i<count; i++){
			cells.push({
				number: i,
				isAlive: false,
				isBorn: false
			});
		}

		for(var i=0; i<400; i++){
			var x = Math.floor(Math.random()*999 + 1);
			cells[x].isAlive = true;
		}
		return cells;
	}

	cellLifeHandler(e){
		let cellId = e.target.dataset.cellId-1;		
		/*console.log(this.findNeighbors(e.target.dataset.cellId-1));*/
		/*this.findNeighbors(e.target.dataset.cellId-1)*/
		let cells = this.state.cells.map((cell)=>Object.assign({},cell))
		let clickedCell = cells[e.target.dataset.cellId-1];
		/*cells[cellId].isBorn =  !cells[cellId].isBorn;
		cells[cellId].isAlive =  !cells[cellId].isAlive;*/
		if(clickedCell.isAlive){
			clickedCell.isAlive = !clickedCell.isAlive;
			clickedCell.isBorn = false;
		}else{
			clickedCell.isBorn = !clickedCell.isBorn;
			clickedCell.isAlive = !clickedCell.isAlive;
		}
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
			if((item === 0) || (item === totalCells)){				
				return totalCells;
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
		let currentGeneration = this.state.game.currentGeneration;
		let countAliveTotal = 0;

		cellsNew.forEach((cell,index)=>{
			let neighbors = this.findNeighbors(index);
			let countAlive = 0;

			neighbors.forEach((item)=>{
				if(cellsState[item-1].isAlive){
					countAlive++;
				}
			});

			if(!cellsState[index].isAlive && countAlive === 3){
				cell.isAlive = true;
				cell.isBorn = true
			}
			if(cellsState[index].isAlive && (countAlive < 2 || countAlive > 3)){
				cell.isAlive = false;
				cell.isBorn = false;
			}
			if(cellsState[index].isAlive && (countAlive === 2 || countAlive === 3)){
				cell.isAlive = true;
				cell.isBorn = false;
			}
			countAliveTotal+=countAlive;
		});

		if(countAliveTotal === 0){
			clearInterval(this.state.intervalId);
			return;
		}
		currentGeneration++;
		this.setState({
			cells: cellsNew,
			game: {currentGeneration}
		});
	}

	componentDidMount(){
		this.startSim();

	}

	startSim(){
		if(!this.state.game.isRunning){
			let intervalId = setInterval(this.conwayRules.bind(this), 200);
			this.setState({intervalId, game: Object.assign({}, this.state.game, {isRunning: true})});
		}
	}

	stopSim(){
		clearInterval(this.state.intervalId);
		this.setState({game: Object.assign({}, this.state.game, {isRunning: false})});
	}

	clearSim(){

		let cells = this.state.cells.map((cell)=>Object.assign({},cell));
		
		cells.forEach((cell)=>{
			cell.isAlive = false;
			cell.isBorn = false;
			/*return cell;*/
		});
		
		this.setState({cells, game: {isRunning: false, currentGeneration: 0}});		
	}

	render(){
		return(
			<div>
				<GameControls startsim={()=>this.startSim()} stopsim={()=>this.stopSim()} nextgen={()=>this.conwayRules()} clearSim={()=>this.clearSim()} />
				<div id="cellcontainer">
					{this.state.cells.map((cell,i)=>{
						/*let cellClass = cell.isAlive ? "cell alive" : "cell dead";*/
						let cellClass = "";
						if(cell.isBorn){
							cellClass = "cell born";
						}else if(cell.isAlive){
							cellClass = "cell alive";
						}else{
							cellClass = "cell dead";
						}




						return <div data-cell-id={i+1} className={cellClass} onClick={(e)=>this.cellLifeHandler(e)} key={i+1}></div>;
					})}
				</div>
				{this.state.game.currentGeneration}
			</div>
			);
	}
}