/**SHORTEST PATH
* @param {number[][]} grid
* @return {number[]}
*/
var shortestPath = function(grid, start, end) {
  if(start===end){
    return [start];
  }
  const n=grid.length;

  const visitQueue=[end];
  const visitParents=[-1];
  let found=false;

  let current;
  let i=0;

  while(i < visitQueue.length){
    //console.log("v", visitQueue);
    //console.log("P", visitParents, "\n");
    current=visitQueue[i];
    for(let j=0;j<n;j++){
      if(grid[current][j]===1){
        if(!visitQueue.includes(j)){
          visitQueue.push(j);
          visitParents.push(i);
        }
        if(j===start){
          found=true;
          break;
        }
      }
    }
    if(found){
      break;
    }
    i++;
  }

  if(found){
    const path=[start];
    do{
      current=visitQueue[i];
      path.push(current);
      i=visitParents[i]
    }while(i!==-1)
    return path;
  }
  return null;
}

const grid=[
  [0,1,1,0,1,0,0,0,0,0],
  [1,0,0,1,1,0,0,0,0,0],
  [1,0,0,1,0,1,1,0,0,0],
  [0,1,1,0,0,1,0,0,0,0],
  [1,1,0,0,0,0,0,0,0,0],
  [0,0,1,1,0,0,1,0,1,0],
  [0,0,1,0,0,1,0,1,0,1],
  [0,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0],
];

console.log(shortestPath(grid, 4, 8));
