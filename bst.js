class Node {
    constructor() {
        this.value = null;
        this.left = null;
        this.right = null;
    };
};

class Tree {
    constructor() {
        this.root = null;
    };

    buildTree(arr) {
        if (arr.length == 0) {
            return null
        } else if (this.root == null) {
            let temp = [];
            for (let i = 0; i < arr.length; i++) {
                if (!(temp.includes(arr[i]))) {
                    temp.push(arr[i]);
                };
            };
            arr = temp;
            arr.sort((a,b) => a-b);
            let middleIndex = Math.floor(arr.length/2);
            let rootNode = new Node();
            rootNode.value = arr[middleIndex];
            this.root = rootNode;
            this.root.left = this.buildTree(arr.slice(0, middleIndex));
            this.root.right = this.buildTree(arr.slice(middleIndex+1));
        } else {
            let middleIndex = Math.floor(arr.length/2);
            let rootNode = new Node();
            rootNode.value = arr[middleIndex];
            rootNode.left = this.buildTree(arr.slice(0, middleIndex));
            rootNode.right = this.buildTree(arr.slice(middleIndex+1));
            return rootNode;
        };
    };

    insert(value) {
        let newNode = new Node();
        newNode.value = value;
        let previous = null;
        let ptr = this.root;
        while (ptr != null) {
            previous = ptr;
            if (ptr.value > value) {
                ptr = ptr.left;
            } else {
                ptr = ptr.right;
            };
        };
        if (previous.value > value) {
            previous.left = newNode;
        } else {
            previous.right = newNode;
        }      
    };
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

testArr = [1, 7, 4, 23, 8, 9, 3, 5, 67, 6345, 324];
let newTree = new Tree();
newTree.buildTree(testArr);
newTree.insert(10);

prettyPrint(newTree.root)