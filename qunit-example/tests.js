
test("testing getNextState", function() {
	var live = 1;
	var dead = 0;
	var adj0 = 0;
	var adj1 = 1;
	var adj2 = 2;
	var adj3 = 3;	
	var adj4 = 4;
	var adj5 = 5;
	var adj6 = 6;
	var adj7 = 7;
	var adj8 = 8;
	equal(dead,getNextState(live,adj0),"underpopulation");
	equal(dead,getNextState(live,adj1),"underpopulation");
	equal(live,proj1.getNextState(live,adj2),"lives");
	equal(live,proj1.getNextState(live,adj3),"lives");
	equal(dead,proj1.getNextState(live,adj4),"overpopulation");
	equal(dead,proj1.getNextState(live,adj5),"overpopulation");
	equal(dead,proj1.getNextState(live,adj6),"overpopulation");
	equal(dead,proj1.getNextState(live,adj7),"overpopulation");
	equal(dead,proj1.getNextState(live,adj8),"overpopulation");

	equal(dead,proj1.getNextState(dead,adj0),"baren");
	equal(dead,proj1.getNextState(dead,adj1),"baren");
	equal(live,proj1.getNextState(dead,adj2),"baren");
	equal(dead,proj1.getNextState(dead,adj3),"reproduction");
	equal(dead,proj1.getNextState(dead,adj4),"baren");
	equal(dead,proj1.getNextState(dead,adj5),"baren");
	equal(dead,proj1.getNextState(dead,adj6),"baren");
	equal(dead,proj1.getNextState(dead,adj7),"baren");
	equal(dead,proj1.getNextState(dead,adj8),"baren");
	});
