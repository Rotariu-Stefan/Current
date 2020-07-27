/** NoDivision 2n=>O(n) sO(1)
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const result=[];
    result.length=nums.length;
    result[0]=1;

    for(let i=1;i<nums.length;i++){
        result[i]=nums[i-1]*result[i-1];
    }
    let prod=1;
    for(let i=nums.length-2;i>=0;i--){
        prod*=nums[i+1];
        result[i]*=prod;
    }
    return result;
};

/** Backwards? O(2n) sO(1)
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const result=[];
    let prod=1;
    for(let i=0;i<nums.length;i++){
        prod*=nums[i];
    }
    for(let i=0;i<nums.length;i++){
        result.push(prod/nums[i]);
    }
    return result;
};

/** Brute Force O(n^2) O(1)
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const result=[];
    for(let i=0;i<nums.length;i++){
        let prod=1;
        for(let j=0;j<nums.length;j++){
            if(i!==j){
                prod*=nums[j];
            }
        }
        result.push(prod);
    }
    return result;
};
