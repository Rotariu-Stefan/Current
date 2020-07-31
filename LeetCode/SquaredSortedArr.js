//https://leetcode.com/problems/squares-of-a-sorted-array/submissions/
/** O(n) sO(1)
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
    let i=0;
    let j=A.length-1;

    const squares=[];
    while(i<=j){
        if(Math.abs(A[i]) < A[j]){
            squares.unshift(A[j]*A[j]);
            j--;
        } else {
            squares.unshift(A[i]*A[i]);
            i++;
        }
    }

    return squares;
};
