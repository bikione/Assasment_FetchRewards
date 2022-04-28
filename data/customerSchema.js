class CustomerData {
  constructor(payer, points) {
    this.payer = payer;
    this.points = points;
  }
  getPoints() {
    return this.points;
  }
  setPoints(points) {
    this.points = points;
  }
}

class CustomerList {
  constructor() {
    this.customers = [];
  }
  add(payer, points) {
    var contain = false;
    for (var i = 0; i < this.customers.length; i++) {
      if (this.customers[i].payer == payer) {
        // Once the correct location is found it is
        // enqueued
        this.customers[i].setPoints(this.customers[i].points + points);
        contain = true;
        break;
      }
    }
    if (!contain) {
      var customerData = new CustomerData(payer, points);
      this.customers.push(customerData);
    }
  }
  getCustomer() {
    return this.customers;
  }
}
module.exports = {
  CustomerList,
};
