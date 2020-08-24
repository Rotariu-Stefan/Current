//https://leetcode.com/problems/zigzag-conversion/
// O(n) O(n) n=len(s)
class Solution {
    public String convert(String s, int numRows) {
        if(s=="" || numRows==0){
            return "";
        }
        if(numRows==1){
            return s;
        }
        ArrayList<Character>[] rows=new ArrayList[numRows];
        for(int i=0;i<rows.length;i++){
            rows[i]=new ArrayList<Character>();
        }

        int iStr=0, iRow=0;
        boolean zig=true;
        while(iStr<s.length()){
            rows[iRow].add(s.charAt(iStr));

            if(zig){
                if(iRow==numRows-1){
                    zig=false;
                    iRow--;
                } else {
                    iRow++;
                }
            } else {
                if(iRow==0){
                    zig=true;
                    iRow++;
                } else {
                    iRow--;
                }
            }
            iStr++;
        }

        StringBuilder result=new StringBuilder();
        for(int i=0;i<rows.length;i++){
            for(int j=0;j<rows[i].size();j++){
                result.append(rows[i].get(j));
            }
        }

        return result.toString();
    }
}
