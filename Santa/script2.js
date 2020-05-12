const fs = require('fs');

const getMin2 = (w, l, h)=>{
	if(w>=l && w>=h)
		return [l, h];
	else if(l>=w && l>=h)
		return [w, h];
	else 
		return [w, l];		
}

fs.readFile("input2.txt", (err, data) => {
	console.time("santa2");
	
	let totalArea=0;
	let w, l, h;
	let min2=[];
	let totalRibbon=0;
	for(let line of data.toString().split("\n")){
		line=line.split("x");
		w=Number(line[0]);
		l=Number(line[1]);
		h=Number(line[2]);
		min2=getMin2(w, l, h);
		totalArea+=2*(w*l+l*h+w*h)+(min2[0]*min2[1]);
		totalRibbon+=2*(min2[0]+min2[1])+w*l*h;
	}
	console.log("Total Area:",totalArea);
	console.log("Total Ribbon:",totalRibbon);
	
	console.timeEnd("santa2");
});