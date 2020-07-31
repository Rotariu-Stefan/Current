//https://leetcode.com/problems/find-all-duplicates-in-an-array/
/** O(n) sO(1)
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    const dups=[];

    for(let i=0;i<nums.length;i++){
        const asIndex=Math.abs(nums[i])-1;
        if(nums[asIndex]<0){
            dups.push(Math.abs(nums[i]));
        } else {
            nums[asIndex]=-nums[asIndex];
        }
    }

    return dups;
};
