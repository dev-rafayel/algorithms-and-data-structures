class TreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  #size = 0;
  #root = null;

  // private helpers
  #_insertRecursionHelper(current, data) {
    if (!current) {
      const newNode = new TreeNode(data);
      ++this.#size;
      return newNode;
    }

    if (data < current.data) {
      current.left = this.#_insertRecursionHelper(current.left, data);
    } else if (data > current.data) {
      current.right = this.#_insertRecursionHelper(current.right, data);
    }
    return current;
  }

  #_containsRecursionHelper(current, data) {
    if (!current) {
      return false;
    }

    if (data === current.data) {
      return true;
    }

    if (data < current.data) {
      return this.#_containsRecursionHelper(current.left, data);
    } else {
      return this.#_containsRecursionHelper(current.right, data);
    }
  }

  #getMin(node) {
    if (!node) return null;
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  #removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.#removeNode(node.right, data);
    } else {
      // нашли узел
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let successor = this.#getMin(node.right);
      node.data = successor.data;
      node.right = this.#removeNode(node.right, successor.data);
    }

    return node;
  }

  // this one is public helper
  _callRoot() {
    if (!this.#root) return null;
    return this.#root;
  }
  // === Utilities ===
  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#root = null;
    this.#size = 0;
  }

  // === Main operations ===
  insertIterative(data) {
    const newNode = new TreeNode(data);
    if (!this.#root) {
      this.#root = newNode;
      ++this.#size;
      return;
    }

    let current = this.#root;

    while (current) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          ++this.#size;
          break;
        }
        current = current.left;
      } else if (data > current.data) {
        if (!current.right) {
          current.right = newNode;
          ++this.#size;
          break;
        }
        current = current.right;
      } else {
        break;
      }
    }
  }

  insertRecursion(data) {
    const oldSize = this.#size;

    this.#root = this.#_insertRecursionHelper(this.#root, data);
    const newSize = this.#size;
    return newSize > oldSize;
  }

  containsIterative(data) {
    if (!this.#root) {
      console.log('Tree is empty');
      return;
    }

    let current = this.#root;
    while (current) {
      if (data === current.data) return true;
      current = data < current.left ? current.left : current.right;
    }
    return false;
  }

  containsRecursion(data) {
    return this.#_containsRecursionHelper(this.#root, data);
  }

  // === Traverse ===
  preOrderIterative() {
    if (!this.#root) return null;
    const stack = [this.#root];

    while (stack.length > 0) {
      const current = stack.pop();
      console.log(current.data);

      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }

  preOrderRecursion(current) {
    if (!current) return;

    console.log(current.data);
    this.preOrderRecursion(current.left);
    this.preOrderRecursion(current.right);
  }

  inOrderIterative() {
    if (!this.#root) return null;

    const stack = [];
    let current = this.#root;

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      console.log(current.data);
      current = current.right;
    }
  }

  inOrderRecursion(current) {
    if (!current) return null;

    if (current.left) {
      this.inOrderRecursion(current.left);
    }
    console.log(current.data);
    this.inOrderRecursion(current.right);
  }

  postOrderIterative() {
    if (!this.#root) return null;

    const stack = [this.#root];
    const newStack = [];

    while (stack.length > 0) {
      let node = stack.pop();
      newStack.push(node);

      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }

    while (newStack.length > 0) {
      const node = newStack.pop();
      console.log(node.data);
    }
  }

  postOrderRecursion(current) {
    if (!current) return null;

    this.postOrderRecursion(current.left);
    this.postOrderRecursion(current.right);
    console.log(current.data);
  }

  levelOrder() {
    if (!this.#root) return null;

    const queue = [this.#root];
    while (queue.length > 0) {
      let current = queue.shift();
      console.log(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  getHeight(node) {
    if (!this.#root) return 0;

    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  remove(data) {
    this.#root = this.#removeNode(data);
  }
}