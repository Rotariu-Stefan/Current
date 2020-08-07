
https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/549/week-1-august-1st-august-7th/3415/
/** O(n^3)? sO(n)
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function(root) {
    const vOrder=[];

    let rootX=0;
    const visited=[{n:root, x:rootX}];
    while(visited.length){
        const len=visited.length;
        const vOrderStarts={};

        for(let i=0;i<len;i++){
            const current=visited.shift();
            let cpos=rootX+current.x;

            if(!vOrder[cpos]){
                if(cpos===-1){
                    vOrder.unshift([]);
                    rootX++;
                    cpos=0;
                } else if(cpos===vOrder.length){
                    vOrder.push([]);
                } else {
                    vOrder[cpos]=[];
                }
            }

            if(vOrderStarts[current.x]===undefined){
                vOrderStarts[current.x]=vOrder[cpos].length;
            }
            for(let i=vOrderStarts[current.x];i<vOrder[cpos].length;i++){
                if(current.n.val<vOrder[cpos][i]){
                    vOrder[cpos].splice(i,0,current.n.val);
                    current.n.val=-1;
                    break;
                }
            }
            if(current.n.val!==-1){
                vOrder[cpos].push(current.n.val);
            }

            if(current.n.left){
                visited.push({n:current.n.left, x:current.x-1});
            }
            if(current.n.right){
                visited.push({n:current.n.right, x:current.x+1});
            }
        }
    }
    return vOrder;
};
