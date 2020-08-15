//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/551/week-3-august-15th-august-21st/3425/
/** O(nlogn) sO(1) n=nr. of intervals
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b)=>a[1]-b[1]);

    let removed=0;
    let i=1;
    while(i<intervals.length){
        if(intervals[i-1][1]>intervals[i][0]){
            intervals.splice(i,1);
            removed++;
        } else {
            i++;
        }
    }

    return removed;
};
