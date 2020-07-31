//https://leetcode.com/problems/pascals-triangle/submissions/
/** O(n^2) ? sO(1)
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    if(!numRows){
        return [];
    }

    const result=[[1]];

    let line;
    for(let r=1;r<numRows;r++){
        line=[];
        line.length=r+1;
        line[0]=1;
        line[r]=1;
        for(let i=1;i<r;i++){
            line[i]=result[r-1][i]+result[r-1][i-1];
        }
        result.push(line);
    }

    return result;
};
