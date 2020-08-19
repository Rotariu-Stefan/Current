//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/551/week-3-august-15th-august-21st/3427/
/** O(m?) sO(1) m=candies
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function(candies, num_people) {
    const result=[];
    result.length=num_people;
    result.fill(0);

    let toGive=1;
    let i=0;
    while(candies>0){
        if(i===num_people){
            i=0;
        }
        result[i]+=toGive;
        candies-=toGive;
        toGive++;
        i++;
    }
    result[i-1]=result[i-1]+candies;

    return result;
};
