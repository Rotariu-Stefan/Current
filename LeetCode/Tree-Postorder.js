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

var postorderITR = function(root) {
    if(!root){
        return [];
    }

    const visited=[];
    const stack=[root];

    while(stack.length){
        const current=stack.pop();
        visited.unshift(current.val);
        for(ch of current.children){
            stack.push(ch);
        }
    }

    return visited;
};

var postorderITR2 = function(root) {    
    if(!root){
        return [];
    }

    const stack=[root];

    let cIndex=1;
    while(stack.length-cIndex>=0){
        const current=stack[stack.length-cIndex];
        for(ch of current.children){
            stack.splice(stack.length-cIndex,0,ch);
        }
        cIndex++;
    }

    const visited=[];
    for(node of stack){
        visited.push(node.val);
    }
    return visited;
};
