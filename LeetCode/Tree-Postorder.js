//https://leetcode.com/problems/n-ary-tree-postorder-traversal/submissions/
/** O(n) <=n=nr nodes sO(n) <=stack space
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
let result=[];
var postorder = function(root) {
    result=[];
    traverse(root);
    return result;
};

const traverse = (node) =>{
    if(!node){
        return;
    }
    for(ch of node.children){
        traverse(ch);
    }
    result.push(node.val);
};
