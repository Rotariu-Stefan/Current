const zombieMatrix = (grid) => {  //O((n)^2) <-n=nr cells sO(n/2)
  if(grid.length===0 && grid[0].length===0){
    return 0;
  }
  let hours=0;
  let toChange=[];

  do{
    toChange=[];
    for(let i=0;i<grid.length;i++){
      for(let j=0;j<grid[0].length;j++){

        if(grid[i][j]===0)
        for(let cell of getAdjCells(i,j,grid)){
          if(grid[cell.i][cell.j]===1){
            toChange.push({i:i, j:j});
            break;
          }
        }
      }
    }

    if(toChange.length>0){
      hours++;
      for(let newZ of toChange){
        grid[newZ.i][newZ.j]=1;
      }
    }
  }while(toChange.length>0)

  return hours;
};
const zombieMatrix2 = (grid) => {  //O((n)^2) <-n=nr cells sO(n/2)
  if(grid.length===0 && grid[0].length===0){
    return 0;
  }
  let hours=0;
  let toChange=[];

  for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid[0].length;j++){

      if(grid[i][j]===0){
        for(let cell of getAdjCells(i,j,grid)){
          if(grid[cell.i][cell.j]===1){
            toChange.push({i:i, j:j});
            break;
          }
        }
      }
    }
  }

  for(let newZ of toChange){
    grid[newZ.i][newZ.j]=1;
  }
  while(toChange.length>0){
    console.log(grid);
    hours++;

    const n=toChange.length;
    for(let i=0;i<n;i++){
      for(let cell of getAdjCells(toChange[0].i, toChange[0].j, grid)){
        if(grid[cell.i][cell.j]===0){
          grid[cell.i][cell.j]=1;
          toChange.push({i:cell.i, j:cell.j});
        }
      }
      toChange.shift();
    }
  }
  console.log(grid);

  return hours;
};

const getAdjCells = (i, j, grid) => {
  const dirs=[[-1,0],[1,0],[0,-1],[0,1]];
  const adjCells=[];
  for(dir of dirs){
    const cell={i:i+dir[0], j:j+dir[1]};
    if(0<=cell.i && cell.i<grid.length && 0<=cell.j && cell.j<grid[0].length){
      adjCells.push(cell);
    }
  }
  return adjCells;
};


const grid =[
  [0, 1, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];


console.log(zombieMatrix2(grid));
