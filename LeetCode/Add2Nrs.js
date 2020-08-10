//https://leetcode.com/problems/add-two-numbers/submissions/
/** O(n) sO(n) n=max len of(l1, l2) could be sO(1) adding to l1 but lazy
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let sum=l1.val+l2.val;
    l1=l1.next;
    l2=l2.next;

    let carry=false;
    if(sum>9){
        sum-=10;
        carry=true;
    }
    let newNode=new ListNode(sum, null);
    const start=newNode;

    while(l1 || l2 || carry){
        if(carry){
            sum=1;
        } else {
            sum=0;
        }
        if(l1){
            sum+=l1.val;
            l1=l1.next;
        }
        if(l2){
            sum+=l2.val;
            l2=l2.next;
        }

        if(sum>9){
            sum-=10;
            carry=true;
        } else {
            carry=false;
        }
        newNode.next=new ListNode(sum, null);
        newNode=newNode.next;
        newNode.val=sum;
    }

    return start;
};
