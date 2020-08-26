//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/552/week-4-august-22nd-august-28th/3437/
//O(n) sO(1)
class Solution {
    public List<String> fizzBuzz(int n) {
        ArrayList<String> result=new ArrayList();

        for(int i=1;i<=n;i++)
            if(i%15==0)
                result.add("FizzBuzz");
            else if(i%3==0)
                result.add("Fizz");
            else if(i%5==0)
                result.add("Buzz");
            else
                result.add(""+i);
        return result;
    }
}
