/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    const color=image[sr][sc];
    if(newColor!==color){
        image[sr][sc]=newColor;
        if(sr!==0 && image[sr-1][sc]===color){
            floodFill(image, sr-1, sc, newColor);
        }
        if(sr!==image.length-1 && image[sr+1][sc]===color){
            floodFill(image, sr+1, sc, newColor);
        }
        if(sc!==0 && image[sr][sc-1]===color){
            floodFill(image, sr, sc-1, newColor);
        }
        if(sc!==image[0].length-1 && image[sr][sc+1]===color){
            floodFill(image, sr, sc+1, newColor);
        }
    }
    return image;
};


/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    fill(image, sr, sc, newColor);
    return image;
};

const fill = (image, sr, sc, newColor) =>{
  const color=image[sr][sc];
  if(newColor===color)  return;
  image[sr][sc]=newColor;
  for(conn of getConnected(image, sr, sc)){
      if(image[conn.i][conn.j]===color){
          floodFill(image, conn.i, conn.j, newColor);
      }
  }
};

const getConnected = (image, sr, sc, directions) =>{
  directions=directions?directions:[{i:-1,j:0},{i:1,j:0},{i:0,j:-1},{i:0,j:1}]

  const connected=[];
  for(dir of directions){
    const newi=sr+dir.i, newj=sc+dir.j;
    if(0<=newi && newi<image.length && 0<=newj && newj<image[0].length){
      connected.push({i:newi, j:newj});
    }
  }
  return connected;
};
