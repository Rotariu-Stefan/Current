//https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/
/** O(n) sO(n) n=nr chars in s
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const foundChars={};
    let maxSubstr=0;
    
    let substr=0;
    let lastFound=-1;
    for(let i=0;i<s.length;i++){
        if(foundChars[s[i]]!==undefined && foundChars[s[i]]>lastFound){
            substr=i-lastFound-1;
            if(substr>maxSubstr){
                maxSubstr=substr;
            }
            lastFound=foundChars[s[i]];
        }
        foundChars[s[i]]=i;
    }

    substr=s.length-lastFound-1;
    if(substr>maxSubstr){
        maxSubstr=substr;
    }
    return maxSubstr;
};
