class DArray {
  #size = 0;
  #capacity = 0;
  #arr = null;
  #CAP_EXPONENT = 2;

  constructor(cap = 1) {
    if (cap <= 0) throw new Error("Capacity must be positive");
    this.#capacity = cap;
    this.#arr = new Uint32Array(cap);
  }

  // Modifiers

  resize(new_cap, fill = 0) {
    const tmp = new Uint32Array(new_cap);
    for (let i = 0; i < this.#size; ++i) {
      tmp[i] = this.#arr[i];
    }

    for (let i = this.#size; i < new_cap; ++i) {
      tmp[i] = fill;
    }
    this.#capacity = new_cap;
    this.#arr = tmp;
    return true;
  }

  push_front(value) {
    if (this.#size === this.#capacity) {
      let newCap =
        this.#capacity === 0 ? 1 : this.#capacity * this.#CAP_EXPONENT;
      this.resize(newCap);
    }

    for (let i = this.#size; i > 0; --i) {
      this.#arr[i] = this.#arr[i - 1];
    }

    this.#arr[0] = value;
    this.#size++;
    return this.#size;
  }

  push_back(elem) {
    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.#CAP_EXPONENT);
    }
    this.#arr[this.#size++] = elem;
    return true;
  }

  pop_front() {
    if (!this.#size) return undefined;
    let return_elem = this.#arr[0];
    for (let i = 1; i < this.#size; ++i) {
      this.#arr[i - 1] = this.#arr[i];
    }
    this.#size--;
    return this.#size;
  }

  pop_back() {
    if (!this.#size) return undefined;
    let return_elem = this.#arr[this.#size - 1];
    this.#size--;
    return return_elem;
  }

  erase(index) {
    if (!this.#size || index < 0 || index >= this.#size) return undefined;

    let return_value = Infinity;
    if (index === this.#size - 1) {
      return_value = this.#arr[index];
      this.#size--;
      return return_value;
    }

    for (let i = index + 1; i < this.#size; ++i) {
      this.#arr[i - 1] = this.#arr[i];
    }
    this.#size--;
    return return_value;
  }

  insert(index, value) {
    if (!this.#size || index < 0 || index >= this.#size) return undefined;

    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.#CAP_EXPONENT);
    }

    for (let i = this.#size; i >= 0; --i) {
      arr[i] = arr[i - 1];
    }

    this.#arr[index] = value;
    this.#size++;
    return this.#size;
  }

  swap(i, j) {
    if (!this.#size || i < 0 || i >= this.#size) return undefined;
    else if (j < 0 || j >= this.#size) return undefined;

    if (i === j || this.#arr[i] === this.#arr[j]) return;

    [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
    return true;
  }

  // === Utilities ===

  size() {
    return this.#size;
  }

  capacity() {
    return this.#capacity;
  }

  empty() {
    return this.#size === 0;
  }

  reserve(n) {
    return this.#capacity + n;
  }

  shrinkToFit() {
    return (this.#capacity = this.#size);
  }

  clear() {
    return (this.#size = 0);
  }

  // Element Access

  at(i) {
    if (i < 0 || i >= this.#size) return undefined;
    const return_value = this.#arr[i];
    return return_value;
  }

  set(i, value) {
    if (i < 0 || i >= this.#size) return undefined;
    const return_value = (this.#arr[i] = value);
    return return_value;
  }

  front() {
    if (!this.#size) return undefined;
    const return_value = this.#arr[0];
    return return_value;
  }

  back() {
    if (!this.#size) return undefined;
    const return_value = this.#arr[this.#size - 1];
    return return_value;
  }

  toArray() {
    return [...this.#arr];
  }

  // Traversal & iteration
  [Symbol.iterator]() {
    const collection = this.#arr;
    const collection_length = this.#size;
    let index = 0;
    return {
      next() {
        if (index < collection_length) {
          return {
            value: collection[index++],
            done: false,
          };
        }
        return { value: undefined, done: true };
      },
    };
  }

  values() {
    if (!this.#size) {
      throw new Error("The array is empty.");
    }
    const value = this.#arr;
    const size = this.#size;
    let index = 0;
    return {
      next() {
        if (index < size) {
          return { val: value[index++], done: false };
        }
        return { val: undefined, done: true };
      },
    };
  }

  keys() {
    const values = this.#arr;
    const size = this.#size;
    let index = 0;

    return {
      next() {
        if (index < size) {
          return { val: index++, done: false };
        }
        return { val: undefined, done: true };
      },
    };
  }

  entries() {
    const values = this.#arr;
    const size = this.#size;
    let keys = 0;

    return {
      next() {
        if (keys < size) {
          return { val: [keys, values[keys++]], done: false };
        }
        return { val: [], done: true };
      },
    };
  }

  forEach(fn, thisArg) {
    if (typeof fn !== "function") {
      throw new Error("Ba heto?");
    }

    for (let i = 0; i < this.#size; ++i) {
      fn.call(thisArg, this.#arr[i], i, this);
    }
    return undefined;
  }

  // Higher-Order Methods
  map(fn, thisArg) {
    if (typeof fn !== "function")
      throw new Error("Your argument is not a function");

    if (!this.#size) throw new Error("The array is empty.");

    const result = new DArray(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      result.push_back(fn.call(thisArg, this.#arr[i], i, this));
    }
    return result;
  }

  filter(fn, thisArg) {
    if (typeof fn !== "function")
      throw new Error("Your argument is not a function");

    if (!this.#size) throw new Error("The array is empty.");

    const result = new DArray(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      if (fn.call(thisArg, this.#arr, i, this)) {
        result.push_back(fn.call(thisArg, this.#arr[i], i, this));
      }
    }
  }

  reduce(fn, thisArg) {
    if (typeof fn !== "function") {
      throw new Error("Your argument is not a function");
    }

    if (this.#size === 0) throw new Error("The array is empty.");

    let accum = this.#arr[0];
    for (let i = 1; i < this.#size; ++i) {
      if (this.#arr[i]) {
        accum = fn.call(thisArg, accum, this.#arr[i], i, this);
      }
    }
    return accum;
  }

  some(fn, thisArg) {
    if (typeof fn !== "function") {
      throw new Error("Your argument is not a function");
    }

    if (this.#size === 0) throw new Error("The array is empty.");

    for (let i = 0; i < this.#size; ++i) {
      if (fn.call(thisArg, this.#arr[i], i, this)) {
        return true;
      }
    }
    return false;
  }

  every(fn, thisArg) {
    if (typeof fn !== "function") {
      throw new Error("Your argument is not a function");
    }

    if (this.#size === 0) throw new Error("The array is empty.");

    for (let i = 0; i < this.#size; ++i) {
      if (!fn.call(thisArg, this.#arr[i], i, this)) {
        return false;
      }
    }
    return true;
  }

  find(fn, thisArg) {
    if (typeof fn !== "function") {
      throw new Error("Your argument is not a function");
    }

    if (this.#size === 0) throw new Error("The array is empty.");

    for (let i = 0; i < this.#size; ++i) {
      if (fn.call(thisArg, this.#arr[i], i, this)) {
        return this.#arr[i];
      }
    }
    return undefined;
  }

  findIndex(fn, thisArg) {
    if (typeof fn !== "function") {
      throw new Error("Your argument is not a function");
    }

    if (this.#size === 0) throw new Error("The array is empty.");

    for (let i = 0; i < this.#size; ++i) {
      if (fn.call(thisArg, this.#arr[i], i, this)) {
        return i;
      }
    }
    return -1;
  }

  includes(value) {
    if (this.#size === 0) throw new Error("The array is empty.");

    for (let i = 0; i < this.#size; ++i) {
      if (this.#arr[i] === value) {
        return true;
      }
    }
    return false;
  }
}

function testDArray() {
  console.log("=== TESTING DArray CLASS (with delays) ===");
  const arr = new DArray();

  setTimeout(() => {
    arr.push_back(4);
    arr.push_back(10);
    arr.push_back(3);
    arr.push_back(7);
    console.log("1️⃣ After push_back:", [...arr]);
  }, 200);

  setTimeout(() => {
    arr.push_front(100);
    console.log("2️⃣ After push_front(100):", [...arr]);
  }, 400);

  setTimeout(() => {
    arr.pop_back();
    console.log("3️⃣ After pop_back:", [...arr]);
  }, 600);

  setTimeout(() => {
    arr.pop_front();
    console.log("4️⃣ After pop_front:", [...arr]);
  }, 800);

  setTimeout(() => {
    console.log("5️⃣ Front element:", arr.front());
    console.log("6️⃣ Back element:", arr.back());
    console.log("7️⃣ Element at index 1:", arr.at(1));
  }, 1000);

  setTimeout(() => {
    arr.set(1, 42);
    console.log("8️⃣ After set(1, 42):", [...arr]);
  }, 1200);

  setTimeout(() => {
    console.log("9️⃣ Size:", arr.size());
    console.log("🔟 Capacity:", arr.capacity());
  }, 1400);

  setTimeout(() => {
    console.log("11️⃣ Iterating with for...of:");
    for (const value of arr) console.log(" →", value);
  }, 1600);

  setTimeout(() => {
    const mapped = arr.map((x) => x * 2);
    console.log("12️⃣ After map(x => x * 2):", [...mapped]);
  }, 1800);

  setTimeout(() => {
    const filtered = arr.filter((x) => x > 5);
    console.log("13️⃣ After filter(x > 5):", [...filtered]);
  }, 2000);

  setTimeout(() => {
    const reduced = arr.reduce((acc, cur) => acc + cur, 0);
    console.log("14️⃣ After reduce (sum):", reduced);
  }, 2200);

  setTimeout(() => {
    console.log("15️⃣ Includes 10:", arr.includes(10));
    console.log(
      "16️⃣ Find > 5:",
      arr.find((x) => x > 5)
    );
    console.log(
      "17️⃣ Find index of 42:",
      arr.findIndex((x) => x === 42)
    );
  }, 2400);

  setTimeout(() => {
    console.log(
      "18️⃣ Some elements > 50:",
      arr.some((x) => x > 50)
    );
    console.log(
      "19️⃣ Every element > 0:",
      arr.every((x) => x > 0)
    );
  }, 2600);

  setTimeout(() => {
    console.log("=== TEST COMPLETE ===");
  }, 2800);
}

testDArray();
