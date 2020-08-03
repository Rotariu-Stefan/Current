//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/549/week-1-august-1st-august-7th/3411/
/** O(n) sO(1)
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let i=0;
    let j=s.length-1;

    while(i<j){
        while(j>=0 && !testAN(s[j])){
            j--;
        }
        if(j<0){
            break;
        }
        while(!testAN(s[i])){
            i++;
        }
        if(s[i].toLowerCase()===s[j].toLowerCase()){
            i++;
            j--;
        } else {
            return false;
        }
    }

    return true;
};

const testAN = (ch) =>{
    const cc = ch.charCodeAt(0);

    if((cc>47 && cc<58) || (cc>64 && cc<91) || (cc>96 && cc<123)){
        return true;
    } else {
        return false;
    }
};
