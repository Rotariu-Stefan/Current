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
 * @param {number} sum
 * @return {number}
 */
 let tsum;
 let sumNr;
 let memo={};
 let X=0;
 var pathSum = function(root, sum) {
     tsum=sum;
     sumNr=0;
     memo={};

     process(root, 0, 0, 0);

     return sumNr;
 };

  const process = (root, sumPrev, start, nodeIndex) => {
      if(!root){
          return;
      }
      console.log("N"+"->"+start+"-"+nodeIndex+"=>"+X);
      X++;

      if(memo[`${start}-${nodeIndex}`]){
          return;
      }
      memo[`${start}-${nodeIndex}`]=true;

      sumPrev+=root.val;
      if(sumPrev===tsum){
          sumNr++;
      }

      process(root.left, sumPrev, start, 2*nodeIndex+1);
      process(root.left, 0, 2*nodeIndex+1, 2*nodeIndex+1);
      process(root.right, sumPrev, start, 2*nodeIndex+2);
      process(root.right, 0, 2*nodeIndex+2, 2*nodeIndex+2);
  };

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
let X=0;
var pathSum = function(root, sum, start=0, nodeIndex=0) {
    if( root == null ) {
        return 0;
    }

    return dfs(root,sum, start, nodeIndex) +
     pathSum(root.left,sum, nodeIndex*2+1, nodeIndex*2+1) +
     pathSum(root.right,sum, nodeIndex*2+2, nodeIndex*2+2);
};

const dfs=(root, sum, start, nodeIndex)=>{
    if( root == null ) {
        return 0;
    }

    console.log("N"+"->"+start+"-"+nodeIndex+"=>"+X);
    X++;

    let ans = 0;
    sum -= root.val;
    if( sum == 0 ){
        ans++;
    }
    ans += dfs(root.left,sum, start, nodeIndex*2+1);
    ans += dfs(root.right,sum, start, nodeIndex*2+2);
    return ans;
};
