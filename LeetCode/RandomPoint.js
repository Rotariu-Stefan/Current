//WTF WHY U NO WORK? Wtf is "Uniformily"
//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/552/week-4-august-22nd-august-28th/3433/
/** O(1) sO(1)
 * @param {number[][]} rects
 */
var Solution = function(rects) {
    this.rects=rects;
};

/**
 * @return {number[]}
 */
Solution.prototype.pick = function() {
    const rect=this.rects[this.getRand(0, this.rects.length)];
    const x=this.getRand(rect[0], rect[2]+1);
    const y=this.getRand(rect[1], rect[3]+1);
    return [x, y];
};

Solution.prototype.getRand = function(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(rects)
 * var param_1 = obj.pick()
 */
