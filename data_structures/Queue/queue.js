class Queue {
  #size = 0;
  constructor(capacity = 6) {
    this.buffer = new Array(capacity).fill(null);
    this.cap = capacity;
    this.front = 0;
    this.rear = -1;
  }

  size() {
    return "Current size: " + this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  enque(value) {
    this.buffer[++this.rear] = value;
    ++this.#size;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    let res = this.buffer[this.front++];
    this.buffer.splice(0, 1); 
    --this.#size;
    return res;
  }

  peek() {
    if (this.#size === 0) throw new RangeError("Queue is empty");
    return "The first in queue: " + this.buffer[0];
  }
}

function checkQueue() {
  const queue = new Queue(10);
  queue.enque(10);
  queue.enque(20);
  queue.enque(30);
  queue.enque(40);
  queue.enque(50);
  queue.enque(60);
  queue.enque(70);
  queue.enque(80);
  queue.enque(90);
  queue.enque(100);
  console.log(queue.buffer);
  console.log(queue.dequeue());
  console.log(queue.dequeue());
  console.log(queue.buffer);  
  console.log(queue.peek())
}

checkQueue();