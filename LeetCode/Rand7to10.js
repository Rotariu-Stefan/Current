//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/552/week-4-august-22nd-august-28th/3439/
/** O(1)(5iterations is enough?) sO(1)(no real extra space)
 * The rand7() API is already defined in the parent class SolBase.
 * public int rand7();
 * @return a random integer in the range 1 to 7
 */
class Solution extends SolBase {
    public int rand10() {
        double r7=1;

        for(int i=1;i<=5;i++){
            r7+=rand7();
        }
        r7=r7%10+1;

        return (int)r7;
    }
}
