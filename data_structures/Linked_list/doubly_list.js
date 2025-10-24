class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;
  #MAGIC_ZERO = 0;

  constructor(iterables) {
    // if (!iterables) return undefined;
    console.log(typeof iterables, iterables);
    if (
      typeof iterables === "object" &&
      typeof iterables[Symbol.iterator] === "function"
    ) {
      for (const item of iterables) {
        this.push_back(item);
        ++this.#size;
      }
    } else {
      throw new Error("Invalid argument type");
    }
  }

  // iterator
  [Symbol.iterator]() {
    let current = this.#head;
    return {
      next() {
        if (current) {
          let data = { val: current.data, done: false };
          current = current.next;
          return data;
        } else {
          setTimeout(() => {
            throw new Error("Segmentation fault: (core dumped)");
          });
        }
      },
    };
  }

  // === Utilities ===
  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#head = null;
    this.#size = 0;
  }

  // === Main operations ===
  push_front(data) {
    const newNode = new Node(data);
    if (!this.#size) {
      this.#head = newNode;
      this.#tail = newNode;
      this.#size++;
      return;
    } else {
      newNode.next = this.#head;
      this.#head.prev = newNode;
      this.#head = newNode;
    }

    this.#size++;
    return this.#head;
  }

  push_back(data) {
    const newNode = new Node(data);
    if (!this.#size) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.prev = this.#tail;
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
    this.#size++;
    return this.#head;
  }

  pop_front() {
    if (!this.#head) return;

    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.prev = null;
    }
    this.#size--;
  }

  pop_back() {
    if (!this.#size) return;

    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
    }
    this.#size--;
  }

  // === Access ===
  front() {
    if (!this.#head) return;

    return this.#head.data;
  }

  back() {
    if (!this.#tail) return;

    return this.#tail.data;
  }

  at(index) {
    if (!this.#size || this.#size < index) {
      throw new Error("Invalid index.");
    }

    if (index < this.#MAGIC_ZERO) index = this.#size + (index + 1);

    if (index === 1) {
      return this.front();
    }

    if (index === this.#size - 1) {
      return this.back();
    }

    let current = this.#head;
    for (let i = 1; i < index && current.next; ++i) {
      current = current.next;
    }
    return current.data;
  }

  // === Usefull operations ===
  insert(index, data) {
    const newNode = new Node(data);
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
      this.#size++;
      return newNode;
    }

    let current = this.#head;
    for (let i = 0; i < index - 1 && current.next; ++i) {
      current = current.next;
    }
    newNode.next = current.next;
    newNode.prev = current;
    if (current.next) {
      newNode.next.prev = newNode;
    } else {
      this.#tail = newNode;
    }
    current.next = newNode;
    return newNode;
  }

  erase(index) {
    if (!this.#head) return;

    if (index >= this.#size) throw new Error("Invalid index.");
    if (index < this.#MAGIC_ZERO) index = this.#size + (index + 1);

    if (index === this.#MAGIC_ZERO) {
      this.#head = this.#head.next;
      if (this.#head) this.#head.prev = null;
      else this.#tail = null;
    } else if (index === this.#size - 1) {
      this.#tail = this.#tail.prev;
      if (this.#tail) this.#tail.next = null;
      else this.#head = null;
    } else {
      let current = this.#head;
      for (let i = 0; i < index && current.next; ++i) {
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
    }
    this.#size--;
  }

  remove(value, equals = Object.is) {
    if (!this.#size) return false;

    while (this.#head && equals(this.#head.data, value)) {
      this.#head = this.#head.next;
      if (this.#head) {
        this.#head.prev = null;
      }
      this.#size--;
    }

    let current = this.#head;
    while (current) {
      let old = current;
      if (equals(current.data, value) && current.next) {
        current.prev.next = current.next;
        current.next.prev = current.prev;
        old.next = null;
        old.prev = null;
        old.data = null;
        this.#size--;
      } else {
        current = current.next;
      }
    }

    while (this.#tail && equals(this.#tail.data, value)) {
      this.#tail = this.#tail.prev;
      if (this.#tail) {
        this.#tail.next = null;
      }
      this.#size--;
    }
  }

  reverse() {
    if (!this.#size) return;

    let current = this.#head;
    let tmp = this.#head;

    while (current) {
      tmp = current.prev;
      current.prev = current.next;
      current.next = tmp;

      current = current.prev;
    }

    if (tmp) {
      return (this.#head = this.#tail);
    }
  }

  sort(compareFn) {
    const comparator =
      typeof compareFn === "function" ? compareFn : (a, b) => a - b;

    const splitList = (node) => {
      let slowPtr = node;
      let fastPtr = node;
      while (fastPtr?.next?.next) {
        slowPtr = slowPtr.next;
        fastPtr = fastPtr.next.next;
      }
      const middleNode = slowPtr.next;
      slowPtr.next = null;
      if (middleNode) middleNode.prev = null;
      return middleNode;
    };

    const mergeLists = (left, right) => {
      const tempHead = new Node(undefined);
      let current = tempHead;

      while (left && right) {
        if (comparator(left.data, right.data) < 1) {
          current.next = left;
          left.prev = current;
          left = left.next;
        } else {
          current.next = right;
          right.prev = current;
          right = right.next;
        }
        current = current.next;
      }

      current.next = left || right;
      if (current.next) current.next.prev = current;

      const newHead = tempHead.next;
      if (newHead) newHead.prev = null;
      return newHead;
    };

    const sortRecursively = (node) => {
      if (!node || !node.next) return node;
      const mid = splitList(node);
      const leftSorted = sortRecursively(node);
      const rightSorted = sortRecursively(mid);
      return mergeLists(leftSorted, rightSorted);
    };

    this.#head = sortRecursively(this.#head);

    let end = this.#head;
    while (end && end.next) end = end.next;
    this.#tail = end;
  }

  print() {
    let current = this.#head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

function testDoublyLinkedList() {
  console.log("=== TESTING LinkedList CLASS ===");

  const list = new LinkedList([1, 3, 5, 7, 9]);

  setTimeout(() => {
    console.log("Initial list:");
    list.print();

    list.push_front(0);
    list.push_back(10);
  }, 200);

  setTimeout(() => {
    console.log("After push_front(0) and push_back(10):");
    list.print();
  }, 400);

  setTimeout(() => {
    console.log("Front:", list.front());
    console.log("Back:", list.back());
    console.log("At(3):", list.at(3));
  }, 600);

  setTimeout(() => {
    list.insert(2, 99);
    console.log("Inserted 99 at index 2");
  }, 800);

  setTimeout(() => {
    console.log("After insert(2, 99):");
    list.print();
  }, 1000);

  setTimeout(() => {
    list.erase(3);
    console.log("Erased index 3");
  }, 1200);

  setTimeout(() => {
    console.log("After erase(3):");
    list.print();
  }, 1400);

  setTimeout(() => {
    list.remove(99);
    console.log("Removed all 99s");
  }, 1600);

  setTimeout(() => {
    console.log("After remove(99):");
    list.print();
  }, 1800);

  setTimeout(() => {
    list.reverse();
    console.log("Reversed list");
  }, 2000);

  setTimeout(() => {
    console.log("After reverse:");
    list.print();
  }, 2200);

  setTimeout(() => {
    list.sort();
    console.log("Sorted list");
  }, 2400);

  setTimeout(() => {
    console.log("After sort:");
    list.print();
    console.log("Size:", list.size());
    console.log("Is empty:", list.isEmpty());
  }, 2600);

  setTimeout(() => {
    console.log("=== TEST COMPLETE ===");
  }, 2800);
}

// testDoublyLinkedList(); 