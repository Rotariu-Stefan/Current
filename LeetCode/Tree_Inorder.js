//https://leetcode.com/problems/binary-tree-inorder-traversal/submissions/
/** O(n) sO(n) n=nr. of nodes
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

var inorderTraversal = function(root) {
    const result=[];
    let node=root;

    const stack=[];
    while(node){
        stack.push(node);
        node=node.left;
    }

    while(stack.length){
        node=stack.pop();
        result.push(node.val);
        node=node.right;
        while(node){
            stack.push(node);
            node=node.left;
        }
    }

    return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */

var inorderTraversal = function(root) {
    const result=[];
    traverse(root, result);
    return result;
};

const traverse = (node, result) =>{
    if(node){
        traverse(node.left, result);
        result.push(node.val);
        traverse(node.right, result);
    }
}
