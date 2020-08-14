//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/550/week-2-august-8th-august-14th/3421/
/** O(k^2) sO(k) k=nr. of rows
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    if(rowIndex===0){
        return [1];
    }

    const row=[1];
    let aux;
    for(r=1;r<=rowIndex;r++){
        aux=1;
        for(i=1;i<r;i++){
            const temp=row[i];
            row[i]=row[i]+aux;
            aux=temp;
        }
        row.push(1);
    }
    return row;
};
