const fs = require('fs');

console.time("santa");

let floor2=0;
let position2=0;

const dataProc=(data) => {
	let found=false;
	for(let i=0;i<data.length;i++){
		if(data[i]==="(")
			floor2++;
		else
			floor2--;
		if(found===false && floor2===-1)
		{
			found=true;
			position2=i+1;
		}
	}
	console.log("Sync Floor:", floor2, "Position:", position2);
};

const data = fs.readFileSync("input.txt").toString();
dataProc(data);

console.timeEnd("santa");

fs.readFile("input.txt", (err, data) =>{
	console.time("santa1-2");
	
	let floor=0;
	let position=0;
	let found=false;
	data=data.toString();
	for(let i=0;i<data.length;i++){
		if(data[i]==="(")
			floor++;
		else
			floor--;
		if(found===false && floor===-1)
		{
			found=true;
			position=i+1;
		}
	}
	console.log("ASync Floor:", floor, "Position:", position);
	
	console.timeEnd("santa1-2");
});