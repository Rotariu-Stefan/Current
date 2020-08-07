//https://leetcode.com/problems/two-sum/submissions/
/** O(n) sO(n)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const hash={};
    for(let i=0;i<nums.length;i++){
        if(hash[nums[i]]!==undefined){
            return [hash[nums[i]], i];
        }
        hash[target-nums[i]]=i;
    }
    return [-1, -1];
};
