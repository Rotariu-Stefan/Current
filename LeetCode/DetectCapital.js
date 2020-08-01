//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/549/week-1-august-1st-august-7th/3409/
/** O(n) sO(1)
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
    let upper=0;
    let lower=false;
    for(letter of word){
        if(isLowerCase(letter)){
            if(upper>1){
                return false;
            } else {
                lower=true;
            }
        } else {
            if(lower){
                return false;
            } else {
                upper++;
            }
        }
    }
    return true;
};

const isLowerCase = (string) => /[a-z]/.test(string)
