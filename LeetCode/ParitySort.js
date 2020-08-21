/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParity = function(A) {
    const result=[];
    for(nr of A){
        if(nr%2===0){
            result.unshift(nr);
        } else {
            result.push(nr);
        }
    }
    return result;
};
