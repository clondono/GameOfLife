// a demonstration program using the graphics library
(function () {
	// define some colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);
    
	// create the drawing pad object and associate with the canvas
	var pad = Pad(document.getElementById('canvas'));
	pad.clear();
    
	// set constants to be able to scale to any canvas size
	var MAX_X = 100;
	var MAX_Y = 100;
	var x_factor = pad.get_width() / MAX_X;
	var y_factor = pad.get_height() / MAX_Y;
  
	// draw a box
	pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 10, black);

	var board = new Array(9);
	for(var x = 0; x < board.length; x++) {
		board[x]=new Array(9);
	}
	// draw some circles and squares inside
	var RADIUS = 5;
	var LINE_WIDTH = 2;
	for (var i = 10; i < MAX_X; i = i + 10) {
		for (var j = 10; j < MAX_Y; j = j + 10) {
			// select circle or square according some arbitrary criterion
			if (i % 20 == j % 20) {
				pad.draw_circle(Coord(i*x_factor, j*y_factor),
					RADIUS, LINE_WIDTH, green, green);
				board[j/10-1][i/10-1]=1;
			} else {
				pad.draw_rectangle(Coord(i*x_factor-RADIUS, j*y_factor-RADIUS),
					RADIUS*2, RADIUS*2, LINE_WIDTH, red);
				board[j/10-1][i/10-1]=0;
				}
			}
		}
	alternateBoard=board.slice();
	//create 
	var crossBoard=[[0,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,0],[1,1,1,1,1,1,1,1,1],[0,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,0]];
	var xBoard=[[1,0,0,0,0,0,0,0,1],[0,1,0,0,0,0,0,1,0],[0,0,1,0,0,0,1,0,0],[0,0,0,1,0,1,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,1,0,1,0,0,0],[0,0,1,0,0,0,1,0,0],[0,1,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,0,1]];
	var gliderBoard=[[0,0,1,0,0,0,0,0,0],[1,0,1,0,0,0,0,0,0],[0,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

	//creates the next generation of cells and repaints the canvas
	var nextTurn = function(){
		var nextBoard = new Array(board.length);
		for (var i = 0; i < board.length; i++) {
			nextBoard[i] = new Array(board[i].length);
		}	
		for (var x =0; x < board.length; x++) {
			for(var y = 0; y < board[x].length; y++) {
				var liveAdj = getLiveNeighbors(x,y, board);
				nextBoard[x][y] = getNextState(board[x][y],liveAdj);
			}
		}
		board=nextBoard.slice();
		repaint();
	}
	//returns number of live cells adjacent to cell at board[row][col]
	var getLiveNeighbors = function(row,col, board) {
		var n=0;
		for(var a = -1; a <= 1; a++) {
			for(var b = -1; b <= 1; b++) {
				// check if row value exists
				if(typeof board[row + a] !== "undefined") {
					//check if col value exists
					if(typeof board[row + a][col + b] !== "undefined"){
					n = n + board[row + a][col + b];
					}
				}
			}
		}
		//if alive
		if(isAlive(row,col,board)){
			n=n-1;
		}
		return n;
	}
	 var isAlive = function(row,col, board) {
	 	if(board[row][col]==1){
	 		return true;
	 	}
	 	return false;
	 }
	
	var repaint = function(){
		pad.clear();
		pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 10, black);
		var RADIUS = 5;
		var LINE_WIDTH = 2;
		var scale=10
		for (var x =0; x < board.length; x++) {
			for(var y = 0; y < board[x].length; y++) {	
				if(board[x][y]==1){
					pad.draw_circle(Coord((x*scale+scale)*x_factor, (y*scale+scale)*y_factor),
					RADIUS, LINE_WIDTH, green, green);
				}
				else{
					pad.draw_rectangle(Coord((x*scale+scale)*x_factor-RADIUS, (y*scale+scale)*y_factor-RADIUS),
					RADIUS*2, RADIUS*2, LINE_WIDTH, red);
				}
			}
		}
	}
	//based on neighbors returns whether the cell will be live or dead in next gen
	var getNextState = function(currentState, liveNeighbors) {
		if (currentState == 0) {
			if(liveNeighbors == 3) {
				return 1;
			}
			return 0;
		}
		if(liveNeighbors==2 || liveNeighbors==3) {
			return 1;
		}
		return 0;
	}

	//redraws the canvas based on the board

	var int;
	var startBtn = document.getElementById('start');
	startBtn.onclick = function() {
			int=self.setInterval(function(){ nextTurn() }, 500);
			startBtn.disabled=true;
			stopBtn.disabled=false;

	}
		var stopBtn = document.getElementById('stop');
	stopBtn.onclick = function() {
			int=window.clearInterval(int);
			stopBtn.disabled=true;
			startBtn.disabled=false;

	}
			var resetBtn = document.getElementById('reset');
	resetBtn.onclick = function() {
			var userChoice=document.getElementById('choice');
			
			switch(userChoice.options[userChoice.selectedIndex].value){
				case "x":
					board=xBoard.slice();
					break;
				case "glider":
				
					board=gliderBoard.slice();
					break;
				case "alternate":
					board=alternateBoard.slice();
					break;
				case "cross":
					board=crossBoard.slice();
					break;
			}
			repaint();
			int=window.clearInterval(int);
			stopBtn.disabled=true;
			startBtn.disabled=false;

	}

	// console.log('Unit Tests\n\n');

	// console.log("testing getNextState");
	// var live = 1;
	// var dead = 0;

	// var adj0 = 0;
	// var adj1 = 1;
	// var adj2 = 2;
	// var adj3 = 3;	
	// var adj4 = 4;
	// var adj5 = 5;
	// var adj6 = 6;
	// var adj7 = 7;
	// var adj8 = 8;
	 
	// console.log("was live 0 live neighbors died from underpopulation:" + (dead===getNextState(live,adj0)));
	// console.log("was live 1 live neighbors died from underpopulation:" + (dead===getNextState(live,adj1)));
	// console.log("was live 2 live neighbors lives:" + (live===getNextState(live,adj2)));
	// console.log("was live 3 live neighbors lives:" + (live===getNextState(live,adj3)));
	// console.log("was live 4 live neighbors dies from overpopulation: " + (dead===getNextState(live,adj4)));
	// console.log("was live 5 live neighbors dies from overpopulation: " + (dead===getNextState(live,adj5)));
	// console.log("was live 7 live neighbors dies from overpopulation: " + (dead===getNextState(live,adj6)));
	// console.log("was live 7 live neighbors dies from overpopulation: " + (dead===getNextState(live,adj7)));
	// console.log("was live 8 live neighbors dies from overpopulation: " + (dead===getNextState(live,adj8)));

	// console.log("was dead 0 live neightbors stays dead: " + (dead===getNextState(dead,adj0)));
	// console.log("was dead 1 live neightbors stays dead: " + (dead===getNextState(dead,adj1)));
	// console.log("was dead 2 live neightbors stays dead: " + (dead===getNextState(dead,adj2)));
	// console.log("was dead 3 live neightbors  is born: " + (live===getNextState(dead,adj3)));
	// console.log("was dead 4 live neightbors stays dead: " + (dead===getNextState(dead,adj4)));
	// console.log("was dead 5 live neightbors stays dead: " + (dead===getNextState(dead,adj5)));
	// console.log("was dead 6 live neightbors stays dead: " + (dead===getNextState(dead,adj6)));
	// console.log("was dead 7 live neightbors stays dead: " + (dead===getNextState(dead,adj7)));
	// console.log("was dead 8 live neightbors stays dead: " + (dead===getNextState(dead,adj8)));

	// var testBoard = [[0,0,0], [0,1,0],[0,0,0]];
	
	// console.log("\ntesting isAlive");

	// console.log(testBoard[0]);
	// console.log(testBoard[1]);
	// console.log(testBoard[2]);

	// console.log("cell at (0,0) is dead: " + (false===isAlive(0,0,testBoard)));
	// console.log("cell at (1,1) is alive: " + (true===isAlive(1,1,testBoard)));



	// var testBoard2 = [[1,1,1], [1,1,0],[,0,1]];
	
	// console.log("\ntesting getLiveNeighbors");

	// console.log(testBoard[0]);
	// console.log(testBoard[1]);
	// console.log(testBoard[2]);

	// console.log("cell at (0,0) has 1 neighbor: " + (1===getLiveNeighbors(0,0,testBoard)));
	// console.log("cell at (1,1) has 0 neighbors: " + (0===getLiveNeighbors(1,1,testBoard)));

	// var testBoard2 = [[1,1,1], [1,1,0],[1,1,1]];
	// console.log(testBoard2[0]);
	// console.log(testBoard2[1]);
	// console.log(testBoard2[2]);
	// console.log("cell at (0,0) has 3 neighbors: " + (3===getLiveNeighbors(0,0,testBoard2)));
	// console.log("cell at (1,1) has 7 neighbors: " + (7===getLiveNeighbors(1,1,testBoard2)));
	// console.log("cell at (0,1) has 4 neighbors: " + (4===getLiveNeighbors(0,1,testBoard2)));
	// console.log("cell at (2,2) has 2 neighbors: " + (2===getLiveNeighbors(2,2,testBoard2)));
	// console.log("cell at (1,0) has 5 neighbors: " + (5===getLiveNeighbors(1,0,testBoard2)));

	// var testBoard3 = [[1,1,1], [1,1,0],[1,0,1]];
	// console.log(testBoard3[0]);
	// console.log(testBoard3[1]);
	// console.log(testBoard3[2]);
	// console.log("cell at (1,1) has 6 neighbors: " + (6===getLiveNeighbors(1,1,testBoard3)));


	// var testBoard4 = [[1,1,1], [1,1,1],[1,1,1]];
	// console.log(testBoard4[0]);
	// console.log(testBoard4[1]);
	// console.log(testBoard4[2]);
	// console.log("cell at (1,1) has 8 neighbors: " + (8===getLiveNeighbors(1,1,testBoard4)));

}) ()
