https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/551/week-3-august-15th-august-21st/3428/
/** O(2^N/K???) sO(N=stack) <=per digit
 * @param {number} N
 * @param {number} K
 * @return {number[]}
 */
var numsSameConsecDiff = function(N, K) {
    const result=[];
    if(N===1){
        result.push(0);
    }

    for(let i=1;i<10;i++){
        nextDigit(i, 0, N, K, result);
    }

    return result;
};

const nextDigit = (digit, number, N, K, result) =>{
    if(digit<0 || digit>9){
        return;
    }

    number=number*10+digit;
    if(number>=Math.pow(10, N-1)){
        result.push(number);
        return;
    }

    if(K===0){
        nextDigit(digit, number, N, K, result);
    } else {
        nextDigit(digit-K, number, N, K, result);
        nextDigit(digit+K, number, N, K, result);
    }
};
