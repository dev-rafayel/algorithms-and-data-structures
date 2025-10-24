class PriorityQueue {
  constructor(compareFn = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFn;
  }

  // helpers
  _parent(i) {
    return Math.floor((i - 1) / 2);
  }

  _left(i) {
    return 2 * i + 1;
  }

  _right(i) {
    return 2 * i + 2;
  }

  _heapifyDown(i) {
    const left = this._left(i);
    const right = this._right(i);
    let smallest = i;

    if (
      left < this.size() &&
      this.compare(this.heap[left], this.heap[smallest]) < 0
    ) {
      smallest = left;
    }

    if (
      right < this.size() &&
      this.compare(this.heap[right], this.heap[smallest]) < 0
    ) {
      smallest = right;
    }

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this._heapifyDown(smallest);
    }
  }

  // === Utilities ===
  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  clear() {
    return this.heap = [];
  }

  // === Main Operations ===
  insert(elem) {
    this.heap.push(elem);
    let i = this.heap.length - 1;

    while (this.compare(this.heap[i], this.heap[this._parent(i)]) < 0) {
      [this.heap[i], this.heap[this._parent(i)]] = [
        this.heap[this._parent(i)],
        this.heap[i],
      ];
      i = this._parent(i);
    }
  }

  extract() {
    if (this.isEmpty()) throw new Error("Heap is empty");

    const min = this.heap[0];
    const last = this.heap.pop();
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this._heapifyDown(0);
    }
    return min;
  }

  print() {
    console.log(this.heap);
  }

  peek() {
    if (this.isEmpty()) throw new RangeError("Heap is empty");
    return this.heap[0];
  }
}

function testPriorityQueue() {
  const minHeap = new PriorityQueue((a, b) => a - b);
  const maxHeap = new PriorityQueue((a, b) => b - a);

  console.log("=== MIN HEAP ===");
  minHeap.insert(10);
  minHeap.insert(20);
  minHeap.insert(5);
  minHeap.insert(15);

  minHeap.print(); // Should print [5, 10, 20, 15]
  console.log(minHeap.peek()); // 5
  console.log(minHeap.extract()); // 5
  minHeap.print(); // Shoult print [10, 15, 20]

  console.log("\n=== MAX HEAP ===");
  maxHeap.insert(10);
  maxHeap.insert(20);
  maxHeap.insert(5);
  maxHeap.insert(15);

  maxHeap.print(); // Should print [20, 15, 5, 10]
  console.log(maxHeap.peek()); // 20
  console.log(maxHeap.extract()); // 20
  maxHeap.print(); // Should print [15, 10, 5]
}

testPriorityQueue();
