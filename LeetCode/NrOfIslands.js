//https://leetcode.com/problems/number-of-islands/submissions/
/** O(n) sO(n) n=nr of cells in grid
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if(!grid.length || !grid[0].length){
        return 0;
    }

    let nrIslands=0;
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j]==="1"){
                nrIslands++;
                processCell(i,j,grid);
            }
        }
    }

    return nrIslands;
};

const processCell = (i, j, grid) => {
    if(grid[i][j]==="1"){
        grid[i][j]=null;
        const adjs=getAdjs(i,j,grid);
        for(adj of adjs){
            processCell(adj[0], adj[1], grid);
        }
    }
};

const getAdjs = (i, j, grid) => {
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    const adjs=[];
    for(let dir of dirs){
        const adj=[i+dir[0],j+dir[1]];
        if(adj[0]>=0 && adj[0]<grid.length && adj[1]>=0 && adj[1]<grid[0].length){
            adjs.push(adj);
        }
    }
    return adjs;
};
