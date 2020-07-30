/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    if(!root){
        return true;
    }

    const minmax = validMinMax(root);
    if(minmax){
        return true;
    } else {
        return false;
    }
};

const validMinMax = (node) =>{
    const ret=[];

    if(node.left){
        const leftMM=validMinMax(node.left);
        if(leftMM===null || leftMM[1]>=node.val){
            return null;
        } else {
            ret.push(leftMM[0]);
        }
    } else {
        ret.push(node.val);
    }
    if(node.right){
        const rightMM=validMinMax(node.right);
        if(rightMM===null || rightMM[0]<=node.val){
            return null;
        } else {
            ret.push(rightMM[1]);
        }
    } else {
        ret.push(node.val);
    }
    return ret;
};

//Inorder traverse
var isValidBST = function(root) {
    if(!root){
        return true;
    }

    const stack=[];
    let leftValue=-9999999999;
    while(stack.length || root){
        while(root){
            stack.push(root);
            root=root.left;
        }

        root=stack.pop();
        if(root.val<=leftValue){
            return false;
        }
        leftValue=root.val;
        root=root.right;

    }
    return true;
};
