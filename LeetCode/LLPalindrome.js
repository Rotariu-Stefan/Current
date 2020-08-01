//https://leetcode.com/problems/palindrome-linked-list/submissions/
/** O(2.5n)=> O(n) sO(1)
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var isPalindrome = function(head) {
     if(!head || !head.next){
         return true;
     }

     let i=head, j=head;
     while(j){
         i=i.next;
         j=j.next;
         if(j){
             j=j.next;
         }
     }

     j=i.next;
     i.next=null;
     let temp;
     while(j){
         temp=j.next;
         j.next=i;
         i=j;
         j=temp;
     }

     j=head;
     while(i){
         if(j.val!==i.val){
             return false;
         }
         j=j.next;
         i=i.next;
     }

     return true;
 };
