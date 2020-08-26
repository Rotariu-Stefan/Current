//https://leetcode.com/problems/minimum-cost-for-tickets/submissions/
// O(n) sO(n) n=nr. of days
class Solution {
    private int minCost;
    private int[] days;
    private int[] costs;
    private HashMap<Integer, Integer> memo;

    public int mincostTickets(int[] days, int[] costs) {
        minCost=0;
        memo=new HashMap<Integer, Integer>();
        this.days=days;
        this.costs=costs;

        return getCosts(0);
    }

    public int getCosts(int start){
        if(!memo.containsKey(start)){
            if(start==days.length){
                return 0;
            }
            if(start==days.length-1){
                return Math.min(Math.min(costs[0], costs[1]), costs[2]);
            }

            int cost1=costs[0]+getCosts(nextPeriodStart(start, 1));
            int cost7=costs[1]+getCosts(nextPeriodStart(start, 7));
            int cost30=costs[2]+getCosts(nextPeriodStart(start, 30));
            memo.put(start, Math.min(Math.min(cost1, cost7), cost30));
        }
        return memo.get(start);
    }

    private int nextPeriodStart(int start, int period){
        int lastDay=days[start]+period;
        int nextDay=start;
        while(nextDay<days.length){ //can do binary search instead but meh!
            if(days[nextDay]<lastDay){
                nextDay++;
            } else {
                break;
            }
        }
        return nextDay;
    }
}
