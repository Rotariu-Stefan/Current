//https://leetcode.com/problems/palindrome-number/submissions/
//O(n) sO(1) n=nr. of digits of x
class Solution {
    public boolean isPalindrome(int x) {
        if(x<0){
            return false;
        }

        int len=(int)Math.floor(Math.log10(x)+1);

        int first, last;
        while(len>1){
            first=(int)Math.floor(x/Math.pow(10, len-1));
            last=(int)x%10;

            if(first!=last){
                return false;
            }
            x=(int)((x-first*Math.pow(10, len-1))-last)/10;
            len-=2;
        }

        return true;
    }
}
