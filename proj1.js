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
	nextTurn = function(){
		var nextBoard = new Array(board.length);
		for (var i = 0; i < board.length; i++) {
			nextBoard[i] = new Array(board[i].length);
		}	
		for (var x =0; x < board.length; x++) {
			for(var y = 0; y < board[x].length; y++) {
				var liveAdj = getLiveNeighbors(x,y);
				nextBoard[x][y] = getNextState(board[x][y],liveAdj);
			}
		}
		board=nextBoard.slice();
		repaint();
	}
	//returns number of live cells adjacent to cell at board[row][col]
	getLiveNeighbors = function(row,col) {
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
		if(board[row][col]==1){
			n=n-1;
		}
		return n;
	}
	
	repaint = function(){
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
	getNextState = function(currentState, liveNeighbors) {
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

}) ()
