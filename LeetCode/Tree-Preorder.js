//https://leetcode.com/problems/n-ary-tree-preorder-traversal/submissions/
/** O(n) sO(n) n=nr. of nodes
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function(root) {
    if(!root){
        return [];
    }
    const result=[];

    const stack=[root];
    while(stack.length){
        const node=stack.pop();
        result.push(node.val);
        for(let i=node.children.length-1;i>=0;i--){
            stack.push(node.children[i]);
        }
    }

    return result;
};

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function(root) {
    const result=[];
    traverse(root, result);
    return result;
};

const traverse = (node, result) =>{
  if(node){
      result.push(node.val);
      for(ch of node.children){
          traverse(ch, result);
      }
  }
};
