https://leetcode.com/problems/find-the-duplicate-number/
/** only works for SINGLE DUPS
* @param {number[]} nums
* @return {number}
*/
var findDuplicate = function(nums) {
  let sum=0;
  for(i=0;i<nums.length;i++){
    sum+=i;
  }
  for(i=0;i<nums.length;i++){
    sum-=nums[i];
  }
  return Math.abs(sum);
};

//WTF?!?!
var findDuplicate = function(nums) {
  let tort=nums[0];
  let hare=nums[0];

  do{
    tort=nums[tort];
    hare=nums[nums[hare]];
  }while(tort!==hare)

  tort=nums[0];
  while(tort!==hare){
    tort=nums[tort];
    hare=nums[hare];
  }

  return tort;
};
