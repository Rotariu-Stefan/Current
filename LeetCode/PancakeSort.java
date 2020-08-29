//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/553/week-5-august-29th-august-31st/3441/
//O(n) sO(1) if flip=O(1)
//O(n^2) if swapping=O(1) (each flip is really O(n) and we do 2flips n-times)
class Solution {
    public List<Integer> pancakeSort(int[] A) {
        List<Integer> flips=new ArrayList();

        int maxPos=0;
        int limit=A.length;

        while(limit>1){
            for(int i=0;i<limit;i++){
                if(A[i]>A[maxPos])
                    maxPos=i;
            }
            if(maxPos!=limit-1){
                flip(maxPos, A);
                flips.add(maxPos+1);
                //System.out.println("K="+(maxPos+1)+" => "+Arrays.toString(A));
                flip(limit-1, A);
                flips.add(limit);
                //System.out.println("K="+(limit-1)+" => "+Arrays.toString(A));
            }

            limit--;
            maxPos=0;
        }

        return flips;
    }

    public void flip(int k, int[] A){
        if(k>=A.length)
            return;
        for(int i=0;i<=k/2;i++){
            int aux=A[i];
            A[i]=A[k-i];
            A[k-i]=aux;
        }
    }
}
