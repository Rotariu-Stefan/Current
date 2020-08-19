//https://leetcode.com/problems/median-of-two-sorted-arrays/submissions/
/** O(logn*logm) sO(1) n,m=length of num1, num2 arrays
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const mpos=Math.floor((nums1.length+nums2.length)/2);
    const isEven=(nums1.length+nums2.length)%2===0;
    const median=medianSlice(0, nums1.length-1, 0, nums2.length-1, mpos, nums1, nums2, isEven);

    return median;
};

const medianSlice = (start1, end1, start2, end2, mpos, nums1, nums2, isEven) =>{
    //console.log("SLICE", start1, end1, start2, end2, mpos);

    if(end1-start1===-1){
        let median=nums2[mpos+start2];
        if(isEven){
            median=(median+findMedianPrev(mpos+start2, nums2, nums1))/2;
        }
        return median;
    }
    if(end2-start2===-1){
        let median=nums1[mpos+start1];
        if(isEven){
            median=(median+findMedianPrev(mpos+start1, nums1, nums2))/2;
        }
        return median;
    }

    let mid1=Math.floor((end1+start1)/2);
    const posMid1Nums2=binSearch(start2, end2, nums1[mid1], nums2);
    const cutoff=(mid1-start1)+(posMid1Nums2-start2);

    //console.log("CUTS",(mid1-start1), (posMid1Nums2-start2));

    if(cutoff===mpos){
        let median=nums1[mid1];
        if(isEven){
            median=(median+findMedianPrev(mid1, nums1, nums2))/2;
        }
        return median;
    }
    if(cutoff>mpos){
        end1=mid1-1;
        end2=posMid1Nums2-1;
    }
    if(cutoff<mpos){
        start1=mid1+1;
        start2=posMid1Nums2;
        mpos=mpos-cutoff-1;
    }
    return medianSlice(start1, end1, start2, end2, mpos, nums1, nums2, isEven);
};

const binSearch = (start, end, target, nums) =>{
    while(start<=end){
        const pos=Math.floor((end+start)/2);
        if(nums[pos]===target){

            if(nums.length%2===0){  //PROLLY WRONG!
                return pos;
            } else return pos+1;

        }
        if(nums[pos]>target){
            end=pos-1;
        } else {
            start=pos+1;
        }
    }
    return start;
};

const findMedianPrev = (medianIndex, containNums, otherNums) =>{
    const prevOther=otherNums[
        binSearch(0, otherNums.length-1, containNums[medianIndex], otherNums)-1];
    const prevContain=containNums[medianIndex-1];

    if(prevOther===undefined && prevContain===undefined){
        return containNums[medianIndex];
    } else if(prevOther===undefined){
        return prevContain;
    } else if(prevContain===undefined){
        return prevOther;
    } else {
        return Math.max(prevContain, prevOther);
    }
};

[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,10,20,21]
========================================================
[1,2,6,9,11,12,14,15,17,18,20,21]
[3,4,5,7,8,10,13,16,19]

median poz=floor(len1+len2/2)=>(12+9)/2=21/2=10.5=>10
mid1=12[5]
mo2=13[6]
5+6>10=> cutoff part2
=>
[1,2,6,9,11]
[3,4,5,7,8,10]
mid1=6[2]
mo2=7[3]
2+3=5<10=> cutoff part1 new median poz=10-6=4
=>
[9,11]
[7,8,10]
mid=9[0]
mo2=10[2]
0+2=2<4=> cutoff part1 new median poz=4-3=1
=>
[11]
[10]
mid=11[0]
mo2=A[1]
---------------------------------------------------------
[1,2,6,9,10,12,14,15,17,18,20,21]
[3,4,5,7,8,11,13,16,19]
...
median poz=1
=>
[10]
[11]
mid=10[0]
mo2=11[0]
0+0<1=> cutoff part1 new median poz=1-1=0
=>
[]
[11] =>11
