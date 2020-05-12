const fs = require('fs');

let houses=[{x:0,y:0}];
let visited=1;

const checkHouse=(x, y)=>{
	for(let house of houses)
		if(house.x===x && house.y===y)
			return;
	houses.push({x:x, y:y});
	visited++;
}

fs.readFile("input3.txt", (err, data) =>{
	console.time("santa3-p1");
		
	let cx=0;
	let cy=0;
	
	for (let c of data.toString()) {
		switch(c){
			case "^":
			cy++;
			break;
			case "v":
			cy--;
			break;
			case ">":
			cx++;
			break;
			case "<":
			cx--;
			break;
			default:
			console.log("HUUUUUH??");			
		}
		checkHouse(cx, cy);
	}
	console.log("Houses Visited:", visited);
	
	console.timeEnd("santa3-p1");
});



fs.readFile("input3.txt", (err, data) =>{
	console.time("santa3-p2");
	
	houses=[{x:0,y:0}];
	let cxS=0, cyS=0;
	let cxR=0, cyR=0;	
	visited=1;
	let S=true;
	
	for (let c of data.toString()) {
		switch(c){
			case "^":
			S?cyS++:cyR++;
			break;
			case "v":
			S?cyS--:cyR--;
			break;
			case ">":
			S?cxS++:cxR++;
			break;
			case "<":
			S?cxS--:cxR--;
			break;
			default:
			console.log("HUUUUUH??");			
		}
		checkHouse(S?cxS:cxR, S?cyS:cyR);
		S=!S;
	}
	console.log("Houses Visited:", visited);
	
	console.timeEnd("santa3-p2");
});