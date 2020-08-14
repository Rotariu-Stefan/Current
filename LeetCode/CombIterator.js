//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/550/week-2-august-8th-august-14th/3422/
/** O(n!?) sO(n) n=nr of chars
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function(characters, combinationLength) {
    this.chars=characters;
    this.combIndex=[];
    this.combIndex.length=combinationLength;

    for(i=0;i<combinationLength;i++){
        this.combIndex[i]=i;
    }
};
CombinationIterator.prototype.getComb = function() {
    if(this.combIndex){
        let combStr="";
        for(cIndex of this.combIndex){
            combStr+=this.chars[cIndex];
        }
        return combStr;
    } else {
        return null;
    }
};

/**
 * @return {string}
 */
CombinationIterator.prototype.next = function() {
    const combStr=this.getComb();

    if(combStr){
        this.advance(this.combIndex.length-1);
    }

    return combStr;
};
CombinationIterator.prototype.advance = function(pos) {
    //console.log("TEST", pos, this.combIndex, this.getComb());
    if(pos<0){
        this.combIndex=null;
        return null;
    }

    this.combIndex[pos]++;
    if(this.combIndex[pos]+(this.combIndex.length-1-pos)<this.chars.length){
        return this.combIndex[pos];
    } else {
        const prevIndex=this.advance(pos-1);
        if(prevIndex){
            this.combIndex[pos]=prevIndex+1;
            return this.combIndex[pos];
        } else {
            return null;
        }
    }
};

/**
 * @return {boolean}
 */
CombinationIterator.prototype.hasNext = function() {
    if(this.combIndex){
        return true;
    } else {
        return false;
    }
};

/**
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
