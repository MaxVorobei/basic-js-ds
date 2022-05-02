const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
   constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
   }
}
class BinarySearchTree {
   constructor() {
      this.rootNode = null; // корень bst
   }

   root() {
      return this.rootNode;
   }

   add(data) {
      let newNode = new Node(data);
      if (this.rootNode === null) {
         this.rootNode = newNode;
      } else {
         this.addNode(this.rootNode, newNode);
      }
   }

   addNode (node, newNode) {
      if (newNode.data < node.data) {
         if (node.left === null) {
            node.left = newNode;
         } else {
            this.addNode(node.left, newNode);
         }
      } else {
         if (node.right === null) {
            node.right = newNode;
         } else {
            this.addNode(node.right, newNode);
         }
      }
   }

   has(data) {
      const searchNode = this.find(data);
      return !!searchNode
   }

   find(data) {
      return this.searchNode(this.rootNode, data);
   }

   searchNode (node, data) {
      if (node === null) {
         return null;
      } else if (data < node.data) {
         return this.searchNode(node.left, data);
      } else if (data > node.data) {
         return this.searchNode(node.right, data);
      } else {
         return node;
      }
   }

   remove(data) {
      this.rootNode = this.removeNode(this.rootNode, data);
   }

   removeNode (node, data) {
      if (node === null) {    // проверка на пустое
         return null;
      } else if ( data < node.data) {     
         node.left = this.removeNode(node.left, data);
         return node;
      } else if ( data > node.data) {
         node.right = this.removeNode(node.right, data);
         return node;
      } else {
          // удаляем листья
         if (node.left === null && node.right === null) {
            node = null;
            return node;
         }
      }

      //  проверка на наличие одного поддерева
      if (node.left === null) {
         node = node.right;
         return node;
      } else if (node.right === null) {
         node = node.left;
         return node;
      }

      // обработка с 2мя подВетками
      let replacementNode = this.minNode(node.right);
      node.data = replacementNode.data;
      node.right = this.removeNode(node.right, replacementNode.data);
      return node;
   }

   min() {
      const minN = this.minNode(this.rootNode);
      if (minN === null) {
         return null;
      } else {
         return minN.data
      }
   }

   minNode(node) {
      if (node.left === null) {
         return node;
      } else {
         return this.minNode(node.left);
      }
   }

   max() {
      const maxN = this.maxNode(this.rootNode);
      if (maxN === null) {
         return null;
      } else {
         return maxN.data
      }
   }
   
   maxNode(node) {
      if (node.right === null) {
         return node;
      } else {
         return this.maxNode(node.right);
      }
   }
}


module.exports = {
   BinarySearchTree
};