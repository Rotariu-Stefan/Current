//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/552/week-4-august-22nd-august-28th/3438/
// O(nlogn) sO(n) n=nr. of intervals (does have a few passes)
class Solution {
    public int[] findRightInterval(int[][] intervals) {
        HashMap<int[], Integer> indexes=new HashMap();
        for(int i=0;i<intervals.length;i++){
            indexes.put(intervals[i], i);
        }
        int[][] intervalsEndSort=intervals.clone();

        Arrays.sort(intervals, new ArrCompareStart());
        Arrays.sort(intervalsEndSort, new ArrCompareEnd());
        //System.out.println("Start:"+Arrays.deepToString(intervals));
        //System.out.println("End:"+Arrays.deepToString(intervalsEndSort));

        int[] result=new int[intervals.length];
        int i=0, j=0;
        while(i<intervalsEndSort.length){
            if(j==intervals.length){
                result[indexes.get(intervalsEndSort[i])]=-1;
                i++;
            } else if(intervalsEndSort[i][1]<=intervals[j][0]){
                result[indexes.get(intervalsEndSort[i])]=indexes.get(intervals[j]);
                i++;
            } else {
                j++;
            }
        }

        return result;
    }
}

class ArrCompareStart implements Comparator<int[]>{
    public int compare(int[] a, int[] b){
        return a[0]-b[0];
    }
}
class ArrCompareEnd implements Comparator<int[]>{
    public int compare(int[] a, int[] b){
        return a[1]-b[1];
    }
}

//[[5,8],[2,3],[1,5],[7,8],[10,11],[3,8]]
