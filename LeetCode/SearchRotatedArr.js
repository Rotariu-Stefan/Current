//https://leetcode.com/problems/search-in-rotated-sorted-array/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  if(nums.length===0){
    return -1;
  }
  if(nums.length===1){
    return nums[0]===target?0:-1;
  }

  let left=0, right=nums.length-1;
  let current, pivot;

  while(left<=right){
    current=Math.floor((left+right)/2);

    if(nums[current]>nums[current+1]){
      pivot=current;
      break;
    } else if(nums[current]>=nums[0]){
      left=current+1;
    } else {
      right=current-1;
    }
  }

  if(pivot!==undefined){
    if(target>=nums[0]){
      left=0;
      right=pivot;
    } else {
      left=pivot+1;
      right=nums.length-1;
    }
  } else {
    left=0;
    right=nums.length-1;
  }

  while(left<=right){
    current=Math.floor((left+right)/2);

    if(target===nums[current]){
      return current;
    } else if(nums[current]<target){
      left=current+1;
    } else {
      right=current-1;
    }
  }

  return -1;
}

var binarySearch = function(nums, target) {
  if(nums.length===0){
    return -1;
  }

  let left=0, right=nums.length-1;
  let current;

  while(left<=right){
    current=Math.floor((left+right)/2);

    if(nums[current]===target){
      return current;
    } else if(target>nums[current]){
      left=current+1;
    } else {
      right=current-1;
    }
  }
  return -1;
};

const arr=[3,4,5,6,7,8,0,1,2];
const arr2=[6,8,0,1,2,3,4,5];
const arr3=[8,9,2,3,4];
const target=9;

console.log(search(arr3,target));
