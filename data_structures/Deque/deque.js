// This is an implementation of deque using Array
class Deque {
  #bucket = null;
  // Sizes
  #size = null;
  #bucketSize = null;
  #blockSize = null;
  // Indexing
  #mid = null;
  #headBlock = null;
  #tailBlock = null;
  #headIndex = null;
  #tailIndex = null;

  constructor() {
    // Defining sizes
    this.#size = 0;
    this.#bucketSize = 4;
    this.#blockSize = 8;
    // Indexing
    this.#mid = Math.floor(this.#bucketSize / 2);
    this.#headBlock = this.#mid;
    this.#tailBlock = this.#mid + 1;
    this.#headIndex = this.#blockSize - 1;
    this.#tailIndex = 0;
    // Defining bucket
    this.#bucket = new Array(this.#bucketSize).fill(null);
    this.#bucket[this.#headBlock] = new Array(this.#blockSize).fill(null);
    this.#bucket[this.#tailBlock] = new Array(this.#blockSize).fill(null);
  }
  // Helpers
  #resize() {
    const oldBucket = this.#bucket;
    const newBucketLength = oldBucket.length * 2;
    const newBucket = new Array(newBucketLength).fill(null);
    const offset = Math.floor((newBucketLength - oldBucket.length) / 2);

    for (let i = 0; i < oldBucket.length; ++i) {
      newBucket[i + offset] = oldBucket[i];
    }

    this.#bucket = newBucket;
    this.#headBlock += offset;
    this.#tailBlock += offset;
    return offset;
  }

  #_isFull() {
    if (this.#headBlock === 0 && this.#headIndex === 0) {
      return this.#resize();
    }

    const lastElem = this.#bucket.length - 1;

    if (this.#tailBlock === lastElem && this.#tailIndex >= this.#blockSize) {
      return this.#resize();
    }
  }

  #_isHeadBlockEnded() {
    if (this.#headBlock === 0 && this.#headIndex === 0) {
      --this.#headBlock;
      if (!this.#bucket[this.#headBlock]) {
        this.#bucket[this.#headBlock] = new Array(this.#blockSize).fill(null);
      }
      this.#headIndex = this.#blockSize - 1;
    }
  }

  #_isTailBlockEnded() {
    if (this.#tailIndex >= this.#blockSize) {
      ++this.#tailBlock;
      if (!this.#bucket[this.#tailBlock]) {
        this.#bucket[this.#tailBlock] = new Array(this.#blockSize).fill(null);
      }
      this.#tailIndex = 0;
    }
  }

  // === Iterator ===
  [Symbol.iterator]() {
    const total = this.#size;
    let count = 0;
    let block = this.#headBlock;
    let index = this.#headIndex + 1;
    const blockSize = this.#blockSize;

    return {
      next: () => {
        if (count >= total) {
          return { value: undefined, done: true };
        }

        if (index >= blockSize) {
          ++block;
          index = 0;
        }

        const val = this.#bucket[block][index++];
        ++count;
        return { value: val, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  print() {
    console.log(this.#bucket);
  }

  // === Utilities ===
  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    const oldBucket = this.#bucket.length;
    this.#bucket = new Array(oldBucket).fill(null);
    this.#size = 0;
    this.#bucket[this.#headBlock] = new Array(this.#blockSize).fill(null);
    this.#headIndex = this.#blockSize - 1;
    this.#bucket[this.#tailBlock] = new Array(this.#blockSize).fill(null);
    this.#tailIndex = 0;
    return this.#bucket;
  }

  // === Main operations ===
  push_front(value) {
    if (typeof value !== 'number') {
      console.log('Entered value must be number');
      return;
    }
    this.#_isFull();
    this.#_isHeadBlockEnded();
    this.#bucket[this.#headBlock][this.#headIndex--] = value;
    ++this.#size;
  }

  push_back(value) {
    if (typeof value !== 'number') {
      console.log('Entered value must be number');
      return;
    }
    this.#_isFull();
    this.#_isTailBlockEnded();
    this.#bucket[this.#tailBlock][this.#tailIndex++] = value;
    ++this.#size;
  }

  pop_front() {
    if (!this.#size) {
      console.log('Deque is empty');
      return;
    }

    const value = this.#bucket[this.#headBlock][this.#headIndex];
    ++this.#headIndex;

    if (this.#headIndex >= this.#blockSize - 1) {
      ++this.#headBlock;
      this.#headIndex = 0;
    }
    --this.#size;
    return value;
  }

  pop_back() {
    if (!this.#size) {
      console.log('Deque is empty');
      return;
    }

    const value = this.#bucket[this.#tailBlock][this.#tailIndex];
    --this.#tailIndex;
    if (this.#tailIndex < 0) {
      --this.#tailBlock;
      this.#tailIndex = this.#blockSize - 1;
    }
    --this.#size;
    return;
  }

  // === Access ===
  at(i) {
    if (typeof i !== 'number') {
      console.log('Wrong type of index passed');
      return;
    }

    if (!this.#size) {
      console.log('Deque is empty');
      return;
    }

    if (i < 0 || i >= this.#size) {
      console.log('Invalid index');
      return;
    }

    let block = this.#headBlock;
    let index = this.#headIndex + 1 + i;

    while (index >= this.#blockSize) {
      index -= this.#blockSize;
      ++block;
    }

    return this.#bucket[block][index];
  }

  front() {
    return this.#size ? this.#bucket[this.#headBlock][++this.#headIndex] : null;
  }

  back() {
    return this.#size ? this.#bucket[this.#tailBlock][--this.#tailIndex] : null;
  }
}