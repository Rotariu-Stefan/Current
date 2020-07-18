/**SHORTEST PATH
* @param {number[][]} grid
* @return {number}
*/

const visited=[];
var maxConnectedColors = function(grid) {
  const n=grid.length,
    m=n===0?-1:grid[0].length;
  if(!m>0){
    return 0;
  }

  let maxConn=0;

  for(let i=0;i<n;i++){
    for(let j=0;j<m;j++){
      const currentConn=calculateConn({i:i, j:j, color:grid[i][j]}, grid);
      if(currentConn > maxConn){
        maxConn=currentConn;
      }
    }
  }

  return maxConn;
}

const calculateConn = (cell, grid) =>{
  grid[cell.i][cell.j]="";

  let currentConn=1;
    if(cell.i!==0){
      currentConn+=verifyConnection(
        {i:cell.i-1, j:cell.j, color:cell.color}, grid);
    }
    if(cell.i!==grid.length-1){
      currentConn+=verifyConnection(
        {i:cell.i+1, j:cell.j, color:cell.color}, grid);
    }
    if(cell.j!==0){
      currentConn+=verifyConnection(
        {i:cell.i, j:cell.j-1, color:cell.color}, grid);
    }
    if(cell.j!==grid[0].length-1){
      currentConn+=verifyConnection(
        {i:cell.i, j:cell.j+1, color:cell.color}, grid);
    }
  return currentConn;
};

const verifyConnection = (cell, grid) =>{
  if(grid[cell.i][cell.j]!=="" && grid[cell.i][cell.j]===cell.color){
    return calculateConn(cell, grid);
  }
  else {
    return 0;
  }
};

const grid=[
  ["blue", "blue", "dark", "red"],
  ["blue", "dark", "red", "dark"],
  ["red", "dark", "dark", "dark"],
  ["red", "red", "dark", "dark"],
]

console.log("RES:", maxConnectedColors(grid));
