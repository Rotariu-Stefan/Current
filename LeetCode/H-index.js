//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/550/week-2-august-8th-august-14th/3420/
/** O(n) sO(n) n=nr papers(citations length)
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    const citeCount=[];
    citeCount.length=citations.length;

    for(cite of citations){
        if(citeCount[cite]){
            citeCount[cite]++;
        } else {
            citeCount[cite]=1;
        }
    }

    let sumCount=0;
    for(i=citeCount.length-1;i>-1;i--){
        if(citeCount[i]){
            sumCount+=citeCount[i];
        }
        if(sumCount>=i){
            return i;
        }
    }
    return 0;
};

/** O(nlogn) sO(1)
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    if(!citations.length){
        return 0;
    }
    citations.sort((a,b)=>a-b);
    if(citations[citations.length-1]===0){
        return 0;
    }

    for(i=citations.length-1;i>-1;i--){
        if(citations[i]<citations.length-i){
            return citations.length-i-1;
        }
    }

    return citations.length;
};
