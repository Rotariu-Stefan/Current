/**ROTTEN ORANGES
* @param {number[][]} grid
* @return {number}
*/	3N^3 (*3)
var orangesRotting = function(grid) {
  let minutes=0;
  let change=true;
  const tempgrid=[];
  for(let row of grid)
  tempgrid.push([...row]);

  while(change){
    change=false;

    for(let i=0;i<grid.length;i++)
    for(let j=0;j<grid.length;j++){
      if(grid[i][j]===2){
        if(j!==0 && grid[i][j-1]===1){
          tempgrid[i][j-1]=2;
          change=true;
        }
        if(i!==0 && grid[i-1][j]===1){
          tempgrid[i-1][j]=2;
          change=true;
        }
        if(j!==grid.length-1 && grid[i][j+1]===1){
          tempgrid[i][j+1]=2;
          change=true;
        }
        if(i!==grid.length-1 && grid[i+1][j]===1){
          tempgrid[i+1][j]=2;
          change=true;
        }
      }
    }
    if(change){
      minutes++;
      grid=[];
      for(let row of tempgrid)
      grid.push([...row]);
    }
  }
  for(let i=0;i<grid.length;i++)
  for(let j=0;j<grid.length;j++)
  if(grid[i][j]===1)
  return -1;
  return minutes;
};



/**
* @param {number[][]} grid
* @return {number}
*/	5N^2 (*3)
var orangesRotting = function(grid) {
  let minutes=0;

  const changedcells=[];
  for(let i=0;i<grid.length;i++)
  for(let j=0;j<grid.length;j++)
  if(grid[i][j]===2)
  changedcells.push({i:i, j:j});
  console.log("InitCC:",changedcells);

  do{
    const nchanged=changedcells.length;
    for(let ic=0;ic<nchanged;ic++){
      const i=changedcells[0].i;
      const j=changedcells[0].j;

      if(i!==0 && grid[i-1][j]===1){
        changedcells.push({i:i-1, j:j});
        grid[i-1][j]=2;
      }
      if(j!==0 && grid[i][j-1]===1){
        changedcells.push({i:i, j:j-1});
        grid[i][j-1]=2;
      }
      if(i!==grid.length-1 && grid[i+1][j]===1){
        changedcells.push({i:i+1, j:j});
        grid[i+1][j]=2;
      }
      if(j!==grid.length-1 && grid[i][j+1]===1){
        changedcells.push({i:i, j:j+1});
        grid[i][j+1]=2;
      }
      changedcells.shift();
    }
    console.log("CC:", changedcells);
    if(changedcells.length>0)
    minutes++;
  }while(changedcells.length>0)

  for(let i=0;i<grid.length;i++)
  for(let j=0;j<grid.length;j++)
  if(grid[i][j]===1)
  return -1;
  return minutes;
};



/** CORECTED! = for Not NxN matrix
* @param {number[][]} grid
* @return {number}
*/	4N^2 (*3)
var orangesRotting = function(grid) {
  let minutes=0;

  const changedcells=[];
  for(let i=0;i<grid.length;i++)
  for(let j=0;j<grid[0].length;j++)
  if(grid[i][j]===2){
    if(i!==0 && grid[i-1][j]===1)
    changedcells.push({i:i-1, j:j});
    if(j!==0 && grid[i][j-1]===1)
    changedcells.push({i:i, j:j-1});
    if(i!==grid.length-1 && grid[i+1][j]===1)
    changedcells.push({i:i+1, j:j});
    if(j!==grid[0].length-1 && grid[i][j+1]===1)
    changedcells.push({i:i, j:j+1});
  }

  if(changedcells.length>0){
    minutes++;

    for(let cell of changedcells)
    grid[cell.i][cell.j]=2;

    do{
      console.log("CC:",changedcells);

      const nchanged=changedcells.length;
      for(let ic=0;ic<nchanged;ic++){
        const i=changedcells[0].i;
        const j=changedcells[0].j;

        if(i!==0 && grid[i-1][j]===1){
          changedcells.push({i:i-1, j:j});
          grid[i-1][j]=2;
        }
        if(j!==0 && grid[i][j-1]===1){
          changedcells.push({i:i, j:j-1});
          grid[i][j-1]=2;
        }
        if(i!==grid.length-1 && grid[i+1][j]===1){
          changedcells.push({i:i+1, j:j});
          grid[i+1][j]=2;
        }
        if(j!==grid0[0].length-1 && grid[i][j+1]===1){
          changedcells.push({i:i, j:j+1});
          grid[i][j+1]=2;
        }
        changedcells.shift();
      }

      if(changedcells.length>0)
      minutes++;

    }while(changedcells.length>0)
  }

  for(let i=0;i<grid.length;i++)
  for(let j=0;j<grid[0].length;j++)
  if(grid[i][j]===1)
  return -1;
  return minutes;
};
