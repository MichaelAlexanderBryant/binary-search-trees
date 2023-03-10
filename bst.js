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

    delete(value) {
        let previous = null;
        let ptr = this.root;
        while ((ptr != null) && (ptr.value != value)) {
            previous = ptr;
            if (ptr.value > value) {
                ptr = ptr.left;
            } else {
                ptr = ptr.right;
            };
        };
        if (ptr != null) {
            if ((ptr.value == value) && (ptr.left == null) && (ptr.right == null)) {
                // case 1: node to delete is a leaf node.
                if (previous.left == ptr) {
                    previous.left = null;
                } else {
                    previous.right = null;
                };
            } else if ((ptr.value == value) && !!((ptr.left == null) ^ (ptr.right == null))) {
                // case 2: node to delete has one child
                if (ptr.left == null) {
                    if (previous.left == ptr) {
                        previous.left = ptr.right;
                    } else {
                        previous.right = ptr.right;
                    };
                } else {
                    if (previous.left == ptr) {
                        previous.left = ptr.left;
                    } else {
                        previous.right = ptr.left;
                    };
                };
            } else if ((ptr.value == value) && (ptr.left != null) && (ptr.right != null)) {
                // case 3: node to delete has two children
                let previousFindReplacement = ptr;
                let findReplacement = ptr.right;
                while (findReplacement.left != null) {
                    previousFindReplacement = findReplacement;
                    findReplacement = findReplacement.left;
                };
                if (previousFindReplacement == ptr) {
                    findReplacement.left = ptr.left;
                    this.root = findReplacement;
                } else {
                    findReplacement.left = ptr.left
                    if (findReplacement.right == null) {
                        previousFindReplacement.left = null;
                        findReplacement.right = ptr.right
                        if (previous.left == ptr) {
                            previous.left = findReplacement;
                        } else {
                            previous.right = findReplacement;
                        }
                    } else {
                        previousFindReplacement.left = findReplacement.right;
                        findReplacement.right = ptr.right
                        findReplacement.left = ptr.right
                        this.root = findReplacement;
                        if (previous != null) {
                            if (previous.left == ptr) {
                                previous.left = findReplacement;
                            } else {
                                previous.right = findReplacement;
                            }
                        };
                    }
                };
            };
        };
    };
    find(value) {
        let ptr = this.root;
        while (ptr != null) {
            if (ptr.value == value) {
                return ptr
            };
            if (ptr.value > value) {
                ptr = ptr.left;
            } else {
                ptr = ptr.right;
            };
        };
        return null;
    };
    levelOrder(fn) {
        let queue = [];
        queue.push(this.root);
        while (queue.length > 0) {
            let nextNode = queue.shift()
            if (nextNode.left != null) {
                queue.push(nextNode.left)
            };
            if  (nextNode.right != null) {
                queue.push(nextNode.right)
            };
            fn(nextNode);
        };
    };
    inorder(currentNode, fn) {
        fn(currentNode);
        if (currentNode.left != null) {
            this.inorder(currentNode.left, fn);
        };
        if (currentNode.right != null) {
            this.inorder(currentNode.right, fn);
        };
    };
    preorder(currentNode, fn) {
        fn(currentNode);
        if (currentNode.left != null) {
            this.inorder(currentNode.left, fn);
        };
        if (currentNode.right != null) {
            this.inorder(currentNode.right, fn);
        };
    };
    inorder(currentNode, fn) {
        if (currentNode.left != null) {
            this.inorder(currentNode.left, fn);
        };
        fn(currentNode);
        if (currentNode.right != null) {
            this.inorder(currentNode.right, fn);
        };
    };
    postorder(currentNode, fn) {
        if (currentNode.left != null) {
            this.inorder(currentNode.left, fn);
        };
        if (currentNode.right != null) {
            this.inorder(currentNode.right, fn);
        };
        fn(currentNode);
    };
    height(currentNode=this.root) {
        // Defined as maximum number of edges
        if ((currentNode.left == null) && (currentNode.right == null)) {
            return 0;
        } else if ((currentNode.left == null) && (currentNode.right != null)) {
            return 1 + this.height(currentNode.right);
        } else if ((currentNode.left != null) && (currentNode.right == null)) {
            return 1 + this.height(currentNode.left);
        } else {
            return 1 + Math.max(this.height(currentNode.left), this.height(currentNode.right));
        };
    };
    depth(currentNode, target) {
        if (this.find(target) != null) {
            if (currentNode.value == target) {
                return 0;
            } else if ((currentNode.value > target) && (currentNode.left != null)) {
                return 1 + this.depth(currentNode.left, target);
            } else if ((currentNode.value < target) && (currentNode.right != null)) {
                return 1 + this.depth(currentNode.right, target);
            };
        } else { return null }
    };
    isBalanced() {
        if (Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1) {
            return true;
        } else {
            return false;
        };
    };
    rebalance() {
        let queue = [];
        let allValues = [];
        queue.push(this.root);
        while (queue.length > 0) {
            let nextNode = queue.shift()
            if (nextNode.left != null) {
                queue.push(nextNode.left)
            };
            if  (nextNode.right != null) {
                queue.push(nextNode.right)
            };
            allValues.push(nextNode.value);
        };
        this.root = null;
        this.buildTree(allValues);
    };
};

export {Tree};