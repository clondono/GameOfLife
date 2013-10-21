Board = function(size, divContain) {
	this._ALIVE = 1;
	this._DEAD = 0;
	this._dimen = size;
	this._board = new Array(this.dimen);
	this._container = divContain;
	that = this;
	var sqrLen = $(this._container).width()/size;

	
	//checks if the given coord is valid
	this.isValidCoord = function(coord) {
		row = coord.x;
		col = coord.y;
		if(row < 0 || row >= that._dimen || col < 0 || col >= that._dimen){
			return false;
		}
		return true;
	}

	//returns the lefngth of one side of the board
	this.length = function() {
		return that._dimen;
	}

	//returns whether or not the cell at the given coord is Alive
	this.isAlive = function(coord) {
		if(this.getCellAt(coord) === that._ALIVE) {
			return true;
		}
		return false;
	}

	//returns the value of the cell (1 or 0) at the give coord
	this.getCellAt = function(coord) {
		return that._board[coord.x][coord.y];
	}
	//this function takes as an input a new array of arrays and copies it into the
	//_board variable, then it draws the new board on screen


	//returns the number of live neighbors surrounding the cell at the given coord
	this.getLiveNeighbors = function(coord) {
		var n = 0;
		var row = coord.x;
		var col = coord.y;

		from_to(-1,2,function(a) {
			from_to(-1,2,function(b) {
				if(this.isValidCoord(Coord(row + a,col + b))) {
					n = n + that._board[row + a][col + b];		
				}	
			});
		});

		*/n = n- that._board[row][col];

		return n;
	}

	//based on neighbors returns whether the cell will be live or dead in next gen
	this.getNextState = function(currentState, liveNeighbors) {
		if (currentState === that._DEAD) {
			if(liveNeighbors === 3) {
				return  that._ALIVE;
			}
			return  that._DEAD;
		}
		if(liveNeighbors === 2 || liveNeighbors === 3) {
			return  that._ALIVE;
		}
		return  that._DEAD;
	}
	this.setCell = function(Coord,state) {
		that._board[Coord.x][Coord.y] = state;
	}
	//draws the current board in dom objects
	this.repaint = function() {
		from_to(0,that._dimen,function(x){
			from_to(0,that._dimen,function(y){
				if(that.isAlive(Coord(x,y))) {
					$("#"+x+"cell"+y).removeClass("dead");
					$("#"+x+"cell"+y).addClass("alive");
				}
				else {
					$("#"+x+"cell"+y).addClass("dead");
					$("#"+x+"cell"+y).removeClass("alive");
				}
			});
		});
	}

	this.updateBoard = function(newBoard){
		that._board = [];
		from_to(0,that._dimen,function(i){
			that._board.push([]);
			from_to(0,that._dimen,function(j){
				that._board[i].push(newBoard[i][j]);
			});
		});
		that.repaint();
	}
	
	this.createCell = function(row,col) {
		var cell = document.createElement("DIV");
		cell.className += "cell";
		cell.id = row + "cell" + col;		$(this._container).append(cell);
		$(cell).css('height',sqrLen + "px");
		$(cell).css('width',sqrLen + "px");
		$(cell).css('top',sqrLen * row);
		$(cell).css('left',sqrLen * col);

		$(cell).click(function(){
			if (that.isAlive(Coord(row,col))) {
				$("#" + x + "cell" + y).addClass("dead");
				$("#" + x + "cell" + y).removeClass("alive");
				that.setCell(Coord(row,col),that._DEAD);
			} else {
				$("#" + x + "cell" + y).removeClass("dead");
				$("#" + x + "cell" + y).addClass("alive");
				that.setCell(Coord(row,col),that._ALIVE);
			}


		})
	}

	from_to(0,that._dimen,function(i) {
		this._board[i] =  [];
		from_to(0,that._dimen,function(j) {
			this.createCell(i,j);
		});
	});

	return {

		//allows the user to input a new Board array and updates the cells accordingly
		updateBoard : function(newBoard) { 
			that._board =[];
			from_to(0,that._dimen,function(i) {
				that._board.push([]);
				from_to(0,that._dimen,function(j) {
					that._board[i].push(newBoard[i][j]);
				});
			});
			that.repaint();
			},

		//creates the next generation of cells and repaints the canvas
		nextGen : function(){
			var nextBoard = new Array(that._dimen);
			from_to(0,that._dimen,function(i) {
				nextBoard[i] = new Array(that._dimen);
			});	
			from_to(0,that._dimen,function(x) {
				from_to(0,that._dimen,function(y) {
					var liveAdj = that.getLiveNeighbors(Coord(x,y));
					nextBoard[x][y] = that.getNextState(that._board[x][y],liveAdj);
				});
			});
			that.updateBoard(nextBoard);
			}, 

		//creates an empty board
		clearBoard : function() {
			from_to(0,that._dimen,function(a) {
				from_to(0,that._dimen,function(b) {
					that.setCell(Coord(a,b),that._DEAD)
				});
			});
			that.repaint();
		},
		//creates a full board
		blackoutBoard : function() {
			from_to(0,that._dimen,function(a) {
				from_to(0,that._dimen,function(b) {
					that.setCell(Coord(a,b),that._ALIVE)
				});
			});
			that.repaint();
		}

	}
}