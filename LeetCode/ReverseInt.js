//https://leetcode.com/problems/reverse-integer/submissions/
/** O(n) sO(1) n=nr digits
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let reverseInt=0;

    while(x!==0){
        const rest=x%10;
        reverseInt=reverseInt*10+rest;
        x=(x-rest)/10;
    }

    if(Math.abs(reverseInt)>Math.pow(2, 31)-1){
        return 0;
    }

    return reverseInt;
};
