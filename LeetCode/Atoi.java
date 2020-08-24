//https://leetcode.com/problems/string-to-integer-atoi/submissions/
//O(n) sO(1) n=nr. of chars in str
class Solution {
    public int myAtoi(String str) {
        double num=0;

        int i=0;
        while(i<str.length()){
            if(str.charAt(i)==' '){
                i++;
            } else {
                break;
            }
        }
        if(i==str.length()){
            return 0;
        }

        boolean minus=false;
        if(str.charAt(i)=='+'){
            i++;
        } else if(str.charAt(i)=='-'){
            minus=true;
            i++;
        }

        double maxTest=(double)Integer.MAX_VALUE+(minus?1:0);
        while(i<str.length()){
            int code=(int)str.charAt(i);
            if(code>=48 && code<=57){
                num=num*10+(code-48);
                if(num>maxTest){
                    num=maxTest;
                    break;
                }
                i++;
            } else {
                break;
            }
        }
        if(num!=0 && minus){
            return (int)-num;
        } else {
            return (int)num;
        }
    }
}
