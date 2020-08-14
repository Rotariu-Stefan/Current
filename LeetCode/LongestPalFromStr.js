https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/550/week-2-august-8th-august-14th/3423/
/** O(n) sO(n) n=nr chars in s
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
    let len=0;
    const chars={};

    for(ch of s){
        if(chars[ch]){
            delete chars[ch];
            len+=2;
        } else {
            chars[ch]=true;
        }
    }
    if(Object.keys(chars).length){
        len++;
    }
    return len;
};
