//https://leetcode.com/explore/challenge/card/august-leetcoding-challenge/553/week-5-august-29th-august-31st/3443/
//O(log(n)) sO(1) 1PASS! n=tree nodes
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        TreeNode crNode=root;
        TreeNode parent=null;
        while(crNode!=null){
            if(crNode.val==key)
                break;
            else if(key<crNode.val){
                parent=crNode;
                crNode=crNode.left;
            }
            else{
                parent=crNode;
                crNode=crNode.right;
            }
        }
        if(crNode!=null){

            if(crNode.left==null){
                if(parent==null)
                    return crNode.right;
                if(key<parent.val)
                    parent.left=crNode.right;
                else
                    parent.right=crNode.right;
            }
            else if(crNode.right==null){
                if(parent==null)
                    return crNode.left;
                if(key<parent.val)
                    parent.left=crNode.left;
                else
                    parent.right=crNode.left;
            }
            else {
                TreeNode found=crNode;
                parent=crNode;
                crNode=crNode.left;
                if(crNode.right==null){
                    found.val=crNode.val;
                    parent.left=crNode.left;
                } else {
                    while(crNode.right!=null){
                        parent=crNode;
                        crNode=crNode.right;
                    }
                    found.val=crNode.val;
                    parent.right=crNode.left;
                }
            }
        }
        return root;



    }
    //[10,5,15,null,7,12,null,6,8,11,13]
    //10
}

class Solution {  //not horribly ugly

    //Get the min value in the right subtree
    public int getRightMin(TreeNode root){
        root = root.right;
        while(root.left != null)
            root = root.left;

        return root.val;
    }
    // Get the max value in the left subtree
    public int getLeftMax(TreeNode root){
        root = root.left;
        while(root.right != null)
            root = root.right;

        return root.val;
    }
    // To delete the nodes
    public TreeNode deleteNode(TreeNode root, int key) {

        // Base condition
        if(root == null)
           return root;

        // Iterate in the right of the tree
        if(key > root.val)
            root.right = deleteNode(root.right, key);

        // Iterate in the left of the tree
        else if(key < root.val)
            root.left = deleteNode(root.left, key);

        // Delete the current node
        else{

            // If root is at the leave
            if(root.left == null && root.right == null){
                root = null;
            }
            else if(root.right != null){
                // Get the least value of the right substree
                // Pass it as the delete key
                // When your program raches it as it is leave so it will delete it
                root.val = getRightMin(root);
                root.right = deleteNode(root.right, root.val);
            }
            else{
                // Get the max value of the left subtree
                // Pass it as the delete key
                // When your program raches it as it is leave so it will delete it
                root.val = getLeftMax(root);
                root.left = deleteNode(root.left, root.val);
            }

        }

        return root;
    }
}
