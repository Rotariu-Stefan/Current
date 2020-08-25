//https://leetcode.com/problems/container-with-most-water/submissions/
// O(n) sO(1) n=nr. of heights
class Solution {
    public int maxArea(int[] height) {
        int i=0, j=height.length-1;
        int maxArea=0, crArea=0;
        while(i<j){
            crArea=(j-i)*Math.min(height[i], height[j]);
            if(crArea>maxArea){
                maxArea=crArea;
            }
            if(height[i]<height[j]){
                i++;
            } else {
                j--;
            }
        }
        return maxArea;
    }
}
