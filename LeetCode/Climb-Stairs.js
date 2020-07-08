/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n===1)
        return 1;
    if(n===2)
        return 2;

    return climbStairs(n-1)+climbStairs(n-2);
};


/**
 * @param {number} n
 * @return {number}
 */
let results=[1, 2];

var climbStairs = function(n) {
    if(n===1)
        return 1;
    if(n===2)
        return 2;

    for(let i=2;i<n;i++){
        results[i]=results[i-1]+results[i-2];
        console.log(results);
    }
    return results[n-1];
};


/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n===1 || n===2)
        return n;

    let prev=1;
    let crr=2;
    for(let i=2;i<n;i++){
        const temp=crr;
        crr=prev+crr;
        prev=temp;
    }
    return crr;
};
