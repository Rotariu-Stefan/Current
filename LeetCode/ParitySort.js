//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/551/week-3-august-15th-august-21st/3431/
/**O(n) sO(1) <-much Better n=nr. or numbers
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParity = function(A) {
    let i=0;
    let j=A.length-1;
    while(i<j){
        if(A[i]%2>A[j]%2){
            const temp=A[i];
            A[i]=A[j];
            A[j]=temp;
        }
        if(A[i]%2===0){
            i++;
        }
        if(A[j]%2===1){
            j--;
        }
    }
    return A;
};

/** O(n) sO(n) n=nr. of numbers
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
