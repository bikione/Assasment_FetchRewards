class QElement {
  constructor(payer, points, timestamp) {
    this.payer = payer;
    this.points = points;
    this.timestamp = timestamp;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  printPQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i].element + " ";
    return str;
  }
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
  dequeue() {
    // return the dequeued element
    // and remove it.
    // if the queue is empty
    // returns Underflow
    if (this.isEmpty()) return "Underflow";
    this.total = this.total - this.items[0].points;
    return this.items.shift();
  }
  enqueue(payer, points, timestamp) {
    // creating object from queue element
    var qElement = new QElement(payer, points, timestamp);
    var contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].timestamp > qElement.timestamp) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
    this.total += qElement.points;
  }
}
module.exports = {
  PriorityQueue,
};
