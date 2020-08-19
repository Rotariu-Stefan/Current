//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/551/week-3-august-15th-august-21st/3429/
/** O(n^2) sO(w+n^2) n=nr words w=nr. chars in S
 * @param {string} S
 * @return {string}
 */
var toGoatLatin = function(S) {
    const vowels=['a','A','e','E','i','I','o','O','u','U'];
    const sArr=S.split(' ');

    for(let i=0;i<sArr.length;i++){
        if(!vowels.includes(sArr[i][0])){
            sArr[i]=sArr[i].slice(1)+sArr[i][0];
        }
        sArr[i]=sArr[i]+'m';
        for(let j=0;j<i+2;j++){
            sArr[i]=sArr[i]+'a';
        }
    }
    return sArr.join(' ');
};

console.log(toGoatLatin("I speak Goat Latin"));
