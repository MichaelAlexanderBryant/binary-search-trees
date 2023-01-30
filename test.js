import {Node, Tree} from "./bst.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

function printNodeValue(aNode) {
    console.log(aNode.value);
};

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let newTree = new Tree();
newTree.buildTree(testArr);
console.log(newTree.isBalanced());
newTree.levelOrder(printNodeValue);
newTree.preorder(newTree.root, printNodeValue);
newTree.inorder(newTree.root, printNodeValue);
newTree.postorder(newTree.root, printNodeValue);
for (let i = -500; i > -550; i--) {
    newTree.insert(i);
};
for (let i = 500; i < 600; i++) {
    newTree.insert(i);
};
console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());
newTree.levelOrder(printNodeValue);
newTree.preorder(newTree.root, printNodeValue);
newTree.inorder(newTree.root, printNodeValue);
newTree.postorder(newTree.root, printNodeValue);