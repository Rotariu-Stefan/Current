//https://leetcode.com/problems/merge-two-binary-trees/
/** O(n) sO(logn?) n=max of (t1,t2) nr. of noes
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
 /** BEST!!!
  * @param {TreeNode} t1
  * @param {TreeNode} t2
  * @return {TreeNode}
  */
 var mergeTrees = function(t1, t2) {
     if(!t1){
         return t2;
     }
     if(!t2){
         return t1;
     }
     const res=new TreeNode(t1.val+t2.val,
                                mergeTrees(t1.left, t2.left),
                                mergeTrees(t1.right, t2.right));
     return res;
 };


 /**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    if(!t1){
        return t2;
    }
    if(!t2){
        return t1;
    }
    t1.val+=t2.val;
    t1.left=mergeTrees(t1.left, t2.left);
    t1.right=mergeTrees(t1.right, t2.right);
    return t1;
};

/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    if(!t1 && !t2){
        return null;
    }

    let res=new TreeNode((t1?t1.val:0)+(t2?t2.val:0), null, null);
    dfs(t1?t1.left:null, t2?t2.left:null, res, 0);
    dfs(t1?t1.right:null, t2?t2.right:null, res, 1);
    return res;
};

const dfs = (t1, t2, res, side) =>{
    if(!t1 && !t2){
        return;
    } else {
        if(side){
            res.right=new TreeNode((t1?t1.val:0)+(t2?t2.val:0), null, null);
        } else {
            res.left=new TreeNode((t1?t1.val:0)+(t2?t2.val:0), null, null);
        }
        dfs(t1?t1.left:null, t2?t2.left:null, side?res.right:res.left, 0);
        dfs(t1?t1.right:null, t2?t2.right:null, side?res.right:res.left, 1);
    }
};

const dfs2 = (t1, t2, res, side) =>{
    let newNode;
    if(!t1){
        newNode=t2;
    }
    else if(!t2){
        newNode=t1;
    } else {
        newNode=new TreeNode((t1?t1.val:0)+(t2?t2.val:0), null, null);
    }
    if(side){
        res.right=newNode;
    } else {
        res.left=newNode;
    }
    if(t1 && t2){
        dfs(t1?t1.left:null, t2?t2.left:null, side?res.right:res.left, 0);
        dfs(t1?t1.right:null, t2?t2.right:null, side?res.right:res.left, 1);
    }
};
