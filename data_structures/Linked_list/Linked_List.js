class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  #head = null;
  #size = 0;

  constructor(iterables) {
    if (!iterables) return;

    if (iterables && typeof iterables[Symbol.iterator] !== 'function') {
      iterables = new Array(iterables);
    }
    this.#head = iterables[0];
  }

  // iterator
  [Symbol.iterator]() {
    let current = this.#head;
    return {
      next() {
        if (!current) return { done: true };
        const value = current.data;
        current = current.next;
        return { value, done: true };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }

  getHead() {
    if (!this.#head) return null;
    return this.#head;
  }

  printf(head) {
    console.log(head);
    if (head) return (head.data);
  }
  // Capacity & Size
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

  // front access
  front() {
    if (!this.#size) {
      return null;
    }
    return this.#head;
  }

  back() {
    if (!this.#size) return null;
    let current = this.#head;
    while (current.next) {
      current = current.next;
    }
    return current.next;
  }

  // Main operations
  push_front(data) {
    const newList = new Node(data);
    newList.next = this.#head;
    this.#head = newList;
    this.#size++;
  }

  push_back(data) {
    const newList = new Node(data);

    if (!this.#size) {
      this.#head = newList;
      this.#size++;
      return;
    }

    let current = this.#head;
    while (current.next) {
      current = current.next;
    }
    current.next = newList;
    this.#size++;
  }

  pop_front() {
    if (!this.#size) {
      return undefined;
    }

    this.#head = null;
    this.#size--;
  }

  pop_back() {
    if (!this.#size) {
      return undefined;
    }

    if (this.#size === 1) {
      this.#head = null;
      this.#size--;
      return;
    }

    let current = this.#head;
    while (current.next.next !== null) {
      current = current.next;
    }
    current.next = null;
    this.#size--;
  }

  at(index) {
    if (!this.#size || index < 0 || index >= this.#size) return;

    let count = 0;
    let current = this.#head;
    while (current.next && count <= index) {
      current = current.next;
      count++;
    }
    return current;
  }

  insert(index, value) {
    if (!this.#size || index < 0 || index >= this.#size) return;
    const newList = new Node(value);

    if (index === 0) {
      newList.next = this.#head;
      this.#head = newList;
    } else {
      let current = this.#head;
      for (let i = 0; i < index - 1; ++i) {
        current = current.next;
      }
      newList.next = current.next;
      current.next = newList;
    }
    this.#size++;
  }

  erase(index) {
    if (!this.#size || index < 0 || index >= this.#size) return;

    if (index === 0) {
      this.#head = this.#head.next;
      this.#size--;
      return;
    }

    let current = this.#head;
    for (let i = 0; i < index - 1; ++i) {
      current = current.next;
    }
    current.next = current.next.next;
    this.#size--;
  }

  remove(value) {
    if (!this.#size) return;

    let removed = 0;
    while (this.#head && this.#head.next) {
      if (this.#head.data === value) {
        this.#head = this.#head.next;
        this.#size--;
        removed++;
      }
    }

    let current = this.#head;
    while (current && current.next) {
      if (current.next.data === value) {
        current.next = current.next.next;
        this.#size--;
        removed++;
      } else {
        current = current.next;
      }
    }
    return removed;
  }

  reverse() {
    if (!this.#size) return;

    let current = this.#head;
    let next = null;
    let prev = null;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    return (this.#head = prev);
  }

  _merge(left, right, fn) {
    if (!left) return right;
    if (!right) return left;

    const dummy = new Node(null);
    let current = dummy;

    while (left && right) {
      if (fn(left.data, right.data) <= 0) {
        current.next = left;
        left = left.next;
      } else {
        current.next = right;
        right = right.next;
      }
      current = current.next;
    }

    current.next = left || right;
    return dummy.next;
  }

  _merge_sort(head, fn) {
    if (!head || !head.next) return head;

    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
    }

    const mid = slow.next;
    slow.next = null;

    const left = this._merge_sort(head, fn);
    const right = this._merge_sort(mid, fn);

    return this._merge(left, right, fn);
  }

  sort(fn = (a, b) => a - b) {
    if (this.#size < 2) return;
    this.#head = this._merge_sort(this.#head, fn);
  }
}

const list = new LinkedList([1, 2, 3, 4, 5])
list.printf(list.getHead());
list.push_back(10)
list.push_back(20)
list.push_back(30)
console.log(list.size())
for (const item of list) {
  console.log(item);
}

// function testLinkedList() {
//   const list = new LinkedList();

//   console.log('=== Testing LinkedList ===');

//   console.log('\nAdding elements at the end via push_back:');
//   [10, 20, 30, 40, 50].forEach((v) => list.push_back(v));
//   printList(list);

//   console.log('\nAdding elements at the front via push_front(5):');
//   list.push_front(5);
//   printList(list);

//   console.log('\nDeleting first element via pop_front():');
//   list.pop_front();
//   printList(list);

//   console.log('\nDeleting last element via pop_back():');
//   list.pop_back();
//   printList(list);

//   console.log('\nAccess to element via at(2):');
//   console.log(list.at(2)?.data);

//   console.log('\nInsert the element via insert(2, 99):');
//   list.insert(2, 99);
//   printList(list);

//   console.log('\nDeleting the element via erase(1):');
//   list.erase(1);
//   printList(list);

//   console.log("\nDeleting all values '99':");
//   list.remove(99);
//   printList(list);

//   console.log('\nChecking reverse():');
//   list.reverse();
//   printList(list);

//   console.log('\nAdding some elements for sorting:');
//   list.push_back(3);
//   list.push_back(1);
//   list.push_back(2);
//   printList(list);

//   console.log('\nSorting list:');
//   list.sort();
//   printList(list);

//   console.log('\nCleaning via clear():');
//   list.clear();
//   printList(list);

//   console.log('\nChecking isEmpty():', list.isEmpty());
//   console.log('List size:', list.size());
//   console.log('✅ All tests passed!');
// }

// function printList(list) {
//   let current = list.front();
//   const result = [];
//   while (current) {
//     result.push(current.data);
//     current = current.next;
//   }
//   console.log(`[ ${result.join(' → ')} ] (size: ${list.size()})`);
// }

// testLinkedList();
