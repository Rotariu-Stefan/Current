//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/549/week-1-august-1st-august-7th/3412/
/** O(log(4)n) sO(1)
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function(num) {
    while(num>1){
        num=num/4;
    }
    if(num===1){
        return true;
    } else {
        return false;
    }
};

//???
var isPowerOfFour = function(num) {
    if(num<=3 && num!==1){
        return false;
    }

    if((num-1&num)===0){
        num=Math.sqrt(num);
    } else {
        return false;
    }

    if(num!==Math.floor(num)){
        return false;
    }

    if((num-1&num)===0){
        return true;
    } else {
        return false;
    }
};

//ZOMG!
var isPowerOfFour = function(num) {
    return num > 0 && (num & (num - 1)) == 0 && (num - 1) % 3 == 0;
    //return num == 1 ? true : num > 0 && (num & (num - 1)) == 0 && (num % 10 == 4 || num % 10 == 6);
};
