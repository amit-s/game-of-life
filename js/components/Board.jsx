import React from 'react';
import GameControls from './GameControls.jsx';
import BoardDimensionControls from './BoardDimensionControls.jsx';

export default class Board extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {			
			board: {			
				columns: 50,
				rows: 30
			},
			game: {
				isRunning: false,
				currentGeneration: 0,
				speed: 400
			}
		}
	}

	componentWillMount(){		
		this.createCells();
	}

	createCells(){
		let cells=[];
		let count = this.state.board.columns * this.state.board.rows;
		for(let i=0; i<count; i++){
			cells.push({
				number: i,
				isAlive: false,
				isBorn: false
			});
		}

		for(var i=0; i<(count/2); i++){
			var x = Math.floor(Math.random()*count);
			cells[x].isAlive = true;
		}
		this.setState({cells});
	}

	cellLifeHandler(e){
		let cellId = e.target.dataset.cellId-1;
		let cells = this.state.cells.map((cell)=>Object.assign({},cell));
		let clickedCell = cells[e.target.dataset.cellId-1];
		
		if(clickedCell.isAlive){
			clickedCell.isAlive = !clickedCell.isAlive;
			clickedCell.isBorn = false;
		}else{
			clickedCell.isBorn = !clickedCell.isBorn;
			clickedCell.isAlive = !clickedCell.isAlive;
		}
		this.setState({cells});
	}

	setGameSpeed(newspeed){
		let speed = Number(newspeed);		
		clearInterval(this.state.intervalId);
		this.setState({game: Object.assign({}, this.state.game, {speed, isRunning: false})}, function(){			
			this.startSim();			
		});		
	}

	setBoardDimensions(dimObj){		
		let board = {
			rows: Number(dimObj.rows),
			columns: Number(dimObj.columns)
		}
		clearInterval(this.state.intervalId);
		this.setState({board, game: Object.assign({}, this.state.game, {isRunning: false, currentGeneration: 0})}, function(){
			this.createCells();
			this.startSim();
		});
	}

	findNeighbors(index){
		let arr = [],
		neighbors = [],
		cell = index+1,
		totalCells = this.state.board.rows*this.state.board.columns;
		
		arr.push(cell);

		if (((cell+1) % this.state.board.columns) === 1){
			arr.push(cell + 1 - this.state.board.columns);
		}else{
			arr.push(cell+1);
		}

		if(((cell-1)%this.state.board.columns) === 0){
			arr.push(cell - 1 + this.state.board.columns);
		}else{
			arr.push(cell-1);
		}

		arr.forEach((item)=>{
			neighbors.push(item);
			neighbors.push(item-this.state.board.columns);
			neighbors.push(item+this.state.board.columns);
		});
		
		neighbors = neighbors.map((item)=>{
			if((item === 0) || (item === totalCells)){				
				return totalCells;
			}else{
				return ((totalCells+item) % totalCells);
			}
		});

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
			game: Object.assign({}, this.state.game, {currentGeneration})
		});

	}

	componentDidMount(){
		this.startSim();
	}

	startSim(){		
		let speed = this.state.game.speed;
		
		if(!this.state.game.isRunning){
			let intervalId = setInterval(this.conwayRules.bind(this), speed);
			this.setState({intervalId, game: Object.assign({}, this.state.game, {isRunning: true})});			
			
			document.getElementById("startButton").className = "btn btn-danger";
			document.getElementById("stopButton").className = "btn";
			document.getElementById("nextgenButton").disabled = "true";
			
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
		
		this.setState({cells, game: Object.assign({}, this.state.game, {isRunning: false, currentGeneration: 0})});		
	}

	render(){
		let boardDimensionsStyle = {
			width: this.state.board.columns * 12,
			/*height: this.state.board.rows * 12*/
		};		
		
		return(
			<div style={boardDimensionsStyle} className="centerit">
				<h1 className="text-center">Conway's Game of Life</h1>
				<GameControls status={this.state.game.isRunning} startsim={()=>this.startSim()} stopsim={()=>this.stopSim()} nextgen={()=>this.conwayRules()} clearSim={()=>this.clearSim()} setSpeed={this.setGameSpeed.bind(this)} />
				<BoardDimensionControls setBoardDimensions={this.setBoardDimensions.bind(this)} />
				<div id="generationCounter" className="text-center">GENERATION : {this.state.game.currentGeneration}</div>
				<div id="cellcontainer">
					{this.state.cells.map((cell,i)=>{						
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
				
			</div>
			);
	}
}