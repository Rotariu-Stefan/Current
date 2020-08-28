//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/552/week-4-august-22nd-august-28th/3439/
/** O(1)(almost always 3 rand7() calls) sO(1)(no real extra space)
 * The rand7() API is already defined in the parent class SolBase.
 * public int rand7();
 * @return a random integer in the range 1 to 7
 */
class Solution extends SolBase {
    //int count=0;
    //double avg=0;

    public int rand10() {
        int r343=342;
        while(r343>339){
            r343=rand343_f7();
        }

        //count++;
        //avg+=r;
        //if(count>=9990){
        //    System.out.println(avg/count);
        //}
        return r343%10+1;
    }

    public int rand2() {
        return new Random().nextInt(2);
    }
    public int rand3() {
        return new Random().nextInt(3);
    }

    public int rand2_f7() {
        int r7=4;
        while(r7==4)
            r7=rand7();

        if(r7<4)
            return 0;
        else
            return 1;
    }
    public int rand5_f7() {
        int r7=5;
        while(r7>4)
            r7=rand7()-1;

        return r7;
    }
    public int rand10_f7() {
        return rand5_f7()*2+rand2_f7();
    }
    public int rand14_f7() {
        return (rand7()-1)*2+rand2_f7();
    }
    public int rand343_f7() {
        return ((rand7()-1)*7+(rand7()-1))*7+(rand7()-1);
    }


    public int rand4() {
        return rand2()*2+rand2();
    }
    public int rand6() {
        return rand3()*2+rand2();
    }
    public int rand9() {
        return rand3()*3+rand3();
    }
    public int rand12() {
        return rand3()*4+rand4();
    }
    public int rand12_v2() {
        return rand4()*3+rand3();
    }
}
//0 1 2 3 4 5 6 7 8 9 10 11


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
