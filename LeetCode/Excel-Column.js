//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/550/week-2-august-8th-august-14th/3419/
/** O(n) sO(1) n=nr. chars in str
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
    let colNr=0;

    let charNr;
    for(let i=0;i<s.length;i++){
        charNr=s.charCodeAt(i)-64;
        colNr+=Math.pow(26, s.length-1-i)*charNr;
    }

    return colNr;
};
