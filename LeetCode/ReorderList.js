/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    if(!head){
        return;
    }

    let p1=head;
    let p2=head;
    while(p2.next && p2.next.next){
        p1=p1.next;
        p2=p2.next.next;
    }
    const temp=p1.next;
    p1.next=null;
    p1=temp;

    p2=p1.next;
    p1.next=null;
    while(p2){
        const temp=p2.next;
        p2.next=p1;
        p1=p2;
        p2=temp;
    }

    p2=head;
    while(p1){
        const temp2=p2.next;
        const temp1=p1.next;
        p2.next=p1;
        p1.next=temp2;
        p2=temp2;
        p1=temp1;
    }
};
