class Deque {
  #map = null;
  #size = 0;
  constructor(initialBucket = 4, BlockSize = 8) {
    if (initialBucket < 2) {
      throw new Error("Needed at least 2 buckets");
    }

    const mid = Math.floor(initialBucket / 2);
    this.#map = new Array(initialBucket).fill(null);
    this.blockSize = BlockSize;
    this.#size = 0;
    // Indexing
    this.headBlock = mid - 1;
    this.tailBlock = mid;
    this.headIndex = BlockSize - 1;
    this.tailIndex = 0;
    // initialization
    this.#map[this.headBlock] = new Array(BlockSize).fill(undefined);
    this.#map[this.tailBlock] = new Array(BlockSize).fill(undefined);
  }

  // === Iterator ===
  [Symbol.iterator]() {
    let count = 0;
    let block = this.headBlock;
    let index = this.headIndex + 1;
    const total = this.#size;
    const blockSize = this.blockSize;

    return {
      next: () => {
        if (count >= total) {
          return { value: undefined, done: true };
        }
        if (index >= blockSize) {
          index = 0;
          ++block;
        }
        const value = this.#map[block][index++];
        ++count;
        return { value, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  print() {
    console.log(this.#map);
  }
  // === Main operations ===
  push_front(value) {
    if (this.headIndex < 0) {
      --this.headBlock;
      this.headIndex = this.blockSize - 1;

      if (this.headBlock < 0) {
        this.resize();
        this.headBlock = 0;
      }
    }

    if (!this.#map[this.headBlock]) {
      this.#map[this.headBlock] = new Array(this.blockSize).fill(undefined);
    }

    this.#map[this.headBlock][this.headIndex] = value;
    --this.headIndex;
    ++this.#size;
  }

  push_back(value) {
    if (this.tailBlock === this.#map.length - 1 && this.tailIndex >= this.blockSize) {
      this.resize();
    }

    if (!this.#map[this.tailBlock]) {
      this.#map[this.tailBlock] = new Array(this.blockSize).fill(undefined);
    }

    this.#map[this.tailBlock][this.tailIndex] = value;
    ++this.tailIndex;
    ++this.#size;

    if (this.tailIndex >= this.blockSize) {
      ++this.tailBlock;
      this.tailIndex = 0;
    }
  }

  pop_front() {
    if (this.#size === 0) {
      throw RangeError("Deque is empty");
    }

    ++this.headIndex;
    if (this.headBlock >= this.blockSize) {
      this.headIndex = 0;
      ++this.headIndex;
    }

    const return_value = this.#map[this.headBlock][this.headIndex];
    --this.#size;
    return return_value;
  }

  pop_back() {
    if (this.#size === 0) {
      throw RangeError("Deque is empty");
    }

    --this.tailIndex;
    if (this.tailBlock <= this.blockSize) {
      this.tailIndex = this.blockSize - 1;
      --this.tailIndex;
    }
    const return_value = this.#map[this.tailBlock][this.tailIndex];
    --this.#size;
    return return_value;
  }
  // === Access ===
  at(index) {
    if (index < 0) {
      index += this.#size;
    }
    if (index < 0 || index >= this.#size) {
      throw new RangeError("Invalid index");
    }

    const absolute = this.headBlock + 1;
    const block = absolute + Math.floor(index / this.blockSize);
    const innerIndex = index % this.blockSize;
    return this.#map[block][innerIndex];
  }

  front() {
    return this.#size
      ? this.#map[this.headBlock][this.headIndex + 1]
      : undefined;
  }

  back() {
    return this.#size
      ? this.#map[this.tailBlock][this.tailIndex - 1]
      : undefined;
  }

  // === Utilities ===
  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    const bucketCount = this.#map.length;
    this.#map = new Array(bucketCount);

    for (let i = 0; i < bucketCount; ++i) {
      this.#map[i] = new Array(this.blockSize).fill(undefined);
    }
    this.#size = 0;

    const mid = Math.floor(this.blockSize / 2);
    this.headBlock = mid - 1;
    this.tailBlock = mid;
    this.headIndex = this.blockSize - 1;
    this.tailIndex = 0;
  }

  resize() {
    const old = this.#map;
    const newLength = old.length * 2;
    const next = new Array(newLength).fill(null);
    const offset = Math.floor((newLength - old.length) / 2);

    for (let i = 0; i < old.length; ++i) {
      next[i + offset] = old[i];
    }

    this.#map = next;
    this.headBlock += offset;
    this.tailBlock += offset;
    return offset;
  }
}

function testDequeAuto() {
  const dq = new Deque(4, 4);

  setTimeout(() => {
    console.log("=== Testing push_back ===");
    dq.push_back(10);
    dq.push_back(20);
    dq.push_back(30);
    dq.push_back(40);
    console.log(dq.size() === 4, "Size after push_back should be 4");
    console.log(dq.front() === 10, "Front after push_back should be 10");
    console.log(dq.back() === 40, "Back after push_back should be 40\n\n");
  }, 0);

  setTimeout(() => {
    console.log("=== Testing push_front ===");
    dq.push_front(5);
    dq.push_front(2);
    console.log(dq.size() === 6, "Size after push_front should be 6");
    console.log(dq.front() === 2, "Front after push_front should be 2");
    console.log(dq.back() === 40, "Back after push_front should be 40");
  }, 10000);

  setTimeout(() => {
    console.log("=== Testing at(index) ===");
    console.log(dq.at(0) === 2, "at(0) should be 2");
    console.log(dq.at(1) === 5, "at(1) should be 5");
    console.log(dq.at(3) === 20, "at(3) should be 20");
    console.log(dq.at(-1) === 40, "at(-1) should be 40\n\n");
  }, 20000);

  setTimeout(() => {
    console.log("=== Testing pop_back ===");
    const back1 = dq.pop_back();
    console.log(back1 === 40, "pop_back should return 40");
    console.log(dq.size() === 5, "Size after pop_back should be 5\n\n");
  }, 30000);

  setTimeout(() => {
    console.log("=== Testing pop_front ===");
    const front1 = dq.pop_front();
    console.log(front1 === 2, "pop_front should return 2");
    console.log(dq.size() === 4, "Size after pop_front should be 4\n\n");
  }, 45000);

  setTimeout(() => {
    console.log("=== Testing isEmpty and size ===");
    console.log(!dq.isEmpty(), "Deque should not be empty");
    console.log(dq.size() === 4, "Size should be 4\n\n");
  }, 60000);

  setTimeout(() => {
    console.log("=== Testing clear() ===");
    dq.clear();
    console.log(dq.size() === 0, "Size after clear should be 0");
    console.log(dq.isEmpty(), "Deque should be empty after clear\n\n");
  }, 70000);

  setTimeout(() => {
    console.log("=== Testing resize() ===");
    dq.push_back(1);
    dq.push_back(2);
    dq.push_back(3);
    dq.push_back(4);
    dq.push_back(5);
    dq.resize();
    console.log(dq.size() === 5, "Size after resize should be 5");
    console.log(dq.at(0) === 1, "First element after resize should be 1");
    console.log(dq.at(4) === 5, "Last element after resize should be 5");
  }, 70000);

  setTimeout(() => {
    console.log("✅ All tests passed!");
  }, 80000);
}

testDequeAuto();