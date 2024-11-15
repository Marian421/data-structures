class Node {
    constructor(data = null, leftSubtree = null, rightSubtree = null) {
        this.data = data;
        this.left = leftSubtree;
        this.right = rightSubtree;
    }
}

class Tree {
    constructor(array) {
        this.root =this.buildTreeFromArray(array);
    }

    buildTreeFromArray(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        return this.buildTree(sortedArray, 0, sortedArray.length - 1);
    }
    
    buildTree(array, start, end) {
        if (start > end) return null;

        let mid = Math.floor((end + start) / 2);

        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        
        return root;
    }

    insert(value, node = this.root) {

        if (node === null) return new Node(value);
        if (node.data === value) return;

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right)
        }

        return node;

    }

    deleteItem(value, node = this.root) {

        if (node === null) return node;

        if (node.data === value) {
            if (node.left === null && node.right === null) {
                return null;
            } else if (node.left !== null && node.right === null) {
                return node.left;
            } else if (node.left === null && node.right !== null) {
                return node.right;
            } else {
                let nextValue = this.#getNextValue(node.right);
                node.right = this.deleteItem(nextValue, node.right);
                node.data = nextValue;
            }

        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            node.left = this.deleteItem(value, node.left);
        }

        return node;

    }

    find(value, node = this.root) {
        if (node === null) return null;

        if (value > node.data) {
            return this.find(value, node.right);
        } else if (value < node.data) {
            return this.find(value, node.left)
        } else return node;
    }

    levelOrder(callback) {
       if(typeof callback !== 'function') throw new Error("A callback function is required");
       
       if (!this.root){
        return;
       }

       const queue = []
       queue.push(this.root);

       while(queue.length > 0){
        callback(queue[0]);

        if(queue[0].left){
            queue.push(queue[0].left);
        }
        if(queue[0].right){
            queue.push(queue[0].right);
        }

        queue.shift();

       }
       
    }

    inOrder(callBack, node = this.root) {
       if(typeof callBack !== 'function') throw new Error("A callback function is required");

       if (node.left) this.inOrder(callBack, node.left);
       callBack(node);
       if (node.right) this.inOrder(callBack, node.right);

       return;
    }

    preOrder(callBack, node = this.root) {
       if(typeof callBack !== 'function') throw new Error("A callback function is required");

       callBack(node);
       if (node.left) this.preOrder(callBack, node.left);
       if (node.right) this.preOrder(callBack, node.right);

       return;
    }

    postOrder(callBack, node = this.root) {
        if(typeof callBack !== 'function') throw new Error("A callback function is required");

        if (node.left) this.postOrder(callBack, node.left);
        if (node.right) this.postOrder(callBack, node.right);
        callBack(node);

       return;
    }

    height(node) {
        
        if (!node) return 0;

        const leftCounter = this.height(node.left);
        const rightCounter = this.height(node.right);

        return Math.max(leftCounter, rightCounter) + 1;

        //while(node)

    }

    depth(node, treeNode = this.root) {
        if(!node) return "Invalid node";

        if(node.data === treeNode.data){
            return 0;
        }

        if (node.data < treeNode.data){
            return this.depth(node, treeNode.left) + 1;
        }


        if (node.data > treeNode.data){
            return this.depth(node, treeNode.right) + 1;
        }
    }

    isBalanced() {
        const nodes = [];

        let check = true;

        this.inOrder((node) => nodes.push(node) );

        nodes.forEach((node) => {
            if (Math.abs(this.height(node.left) - this.height(node.right)) > 1){
                check = false;
            }
        })
       return check; 
    }
    
    rebalance() {
        const nodes = [];
        this.inOrder((node) => nodes.push(node.data));

        this.root = this.buildTree(nodes, 0, nodes.length -1);
    }

    #getNextValue(node) {
        if (node.left === null){
            return node.data;
        }
        while(node.left !== null) {
            node = node.left;
        }

        return node.data;

    }

    //changeSubtree()
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
