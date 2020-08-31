//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/553/week-5-august-29th-august-31st/3442/
// O(n) ????
class Solution {
    public int largestComponentSize(int[] A) {
        Map<Integer,Integer> parent = new HashMap<>();

        for (int num : A)
            for (int fact = 2; fact*fact<=num; fact++)
                if (num % fact == 0){
                    union(num,fact,parent);
                    union(num,num/fact,parent);
                }

        int max = 1;
        Map<Integer,Integer> freq = new HashMap<>();
        for (Integer v : A) {
            int f = find(v,parent);
            if (freq.containsKey(f)) {
                freq.put(f, freq.get(f)+1);
                max=Math.max(max,freq.get(f));
            }
            else freq.put(f,1);
        }
        return max;
    }

    public void union(int n, int m, Map<Integer,Integer> p) {
        int findN = find(n,p);
        int findM = find(m,p);
        if (findN < findM) p.put(findM,findN);
        else p.put(findN,findM);
    }

    public int find(Integer i, Map<Integer,Integer> parent) {
        if (parent.get(i) == null) parent.put(i,i);
        while (i != parent.get(i)) i = parent.get(i);
        return i;
    }
}

[6, 30, 9, 7, 77]
union(6,2)
  find(6)=6
    <6,6>
  find(2)=2
    <2,2>
  <6,2>
union(6,3)
  find(6)=2
  find(3)=3
    <3,3>
  <3,2>
6==><2,2><6,2><3,2>

union(30,2)
  find(30)=30
    <30,30>
  find(2)=2
  <30,2>
union(30,3)
  find(30)=2
  find(3)=2
union(30,5)
  find(30)=2
  find(5)=5
    <5,5>
  <5,2>
6,30==><2,2><6,2><3,2><30,2><5,2>

union(9,3)
  find(9)=9
    <9,9>
  find(3)=2
  <9,2>
union(9,3)
  find(9)=2
  find(3)=2
6,30,9==><2,2><6,2><3,2><30,2><5,2><9,2>

union(49,7)
  find(49)=49
    <49,49>
  find(7)=7
    <7,7>
  <49,7>

6,30,9,7,49==><2,2><6,2><3,2><30,2><5,2><9,2><7,7><49,7>

[9,30,6]
union(9,3)
  find(9)=9
    <9,9>
  find(3)=3
    <3,3>
  <9,3>
union(9,3)
  find(9)=3
  find(3)=3
9=><3,3><9,3>

union(30,2)
  find(30)=30
    <30,30>
  find(2)=2
    <2,2>
  <30,2>
union(30,3)
  find(30)=2
  find(3)=3
    <3,2>
union(30,5)
  find(30)=2
  find(5)=5
    <5,5>
  <5,2>

  9,30==><3,2><9,3><2,2><30,2><5,2>












// O(n^2) sO(n) n=nr. of numbers where O(1)=find common factor=O(min(a,b))
class Solution {
    ArrayList<ArrayList<Integer>> comps;

    public int largestComponentSize(int[] A) {
        comps=new ArrayList<ArrayList<Integer>>();
        comps.add(new ArrayList<Integer>());
        comps.get(0).add(A[0]);

        int link1;
        for(int i=1;i<A.length;i++){
            link1=-1;
            for(int ci=0;ci<comps.size();ci++)
                if(hasFactor(A[i], comps.get(ci))){
                    if(link1==-1){
                        link1=ci;
                        comps.get(ci).add(A[i]);
                        continue;
                    } else {
                        mergeCompsAt(link1, ci);
                        ci--;
                        continue;
                    }
                }
            if(link1==-1){
                comps.add(new ArrayList<Integer>());
                comps.get(comps.size()-1).add(A[i]);
            }
        }
        //System.out.println(Arrays.toString(comps.toArray()));

        int maxSize=0;
        for(var comp:comps)
            if(comp.size()>maxSize)
                maxSize=comp.size();

        return maxSize;
    }

    public boolean hasFactor(int a, ArrayList<Integer> comp){
        for(int item:comp)
            if(hasFactor(a, item))
                return true;
        return false;
    }

    public boolean hasFactor(int a, int b){
        for(int i=2;i<=Math.min(a,b);i++)
            if(a%i==0 && b%i==0)
                return true;
        return false;
    }

    public void mergeCompsAt(int cIndex1, int cIndex2){
        for(int item:comps.get(cIndex2))
            comps.get(cIndex1).add(item);
        comps.remove(cIndex2);
    }
}
