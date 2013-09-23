
//cleaner way to represent two numbers as coordinates
Coord = function(x,y) {	

	this.x = x;
	this.y = y;
	return this;

	 var toString = function() {

	 	return "(" + this.x + "," + this.y + ")";
	 }
}

from_to = function(i,j,runner) {

	for(var a = i; a < j; a++ ){
		runner(a);
	}
}
