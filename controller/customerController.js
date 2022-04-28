const { PriorityQueue } = require("../data/queSchema");
const { CustomerList } = require("../data/customerSchema");

// @RawData
// List of Customer's point and collect history
const object1 = new PriorityQueue();
object1.enqueue("DANNON", 1000, "2020-11-02T14:00:00Z");
object1.enqueue("UNILEVER", 200, "2020-10-31T11:00:00Z");
object1.enqueue("DANNON", -200, "2020-10-31T15:00:00Z");
object1.enqueue("MILLER COORS", 10000, "2020-11-01T14:00:00Z");
object1.enqueue("DANNON", 300, "2020-10-31T10:00:00Z");

// @RawData
// List of Customer's information
const object2 = new CustomerList();

object2.add("DANNON", 1100);
object2.add("UNILEVER", 200);
object2.add("MILLER COORS", 10000);

// @route    GET api/customers/balance
// @desc     Get Balance of All Customers
// @access   Private

const getBalance = async (req, res) => {
  try {
    // Return Customer's name and Total Point
    res.status(200).json(object2);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// @route    POST api/customers
// @desc     Add Customer's points and history date to the list
// @access   Private

const addToQue = async (req, res) => {
  try {
    let isNew = true;
    let comparePoint = 0;
    var currentCustomer = {};
    for (let i in object2.customers) {
      // Check if the user is exist
      if (object2.customers[i].payer == req.body.payer) {
        comparePoint = object2.customers[i].points;
        currentCustomer = object2.customers[i];
        isNew = false;
        break;
      }
    }
    // Checking if customer new
    if (isNew) {
      if (req.body.points < 1) {
        // New Customer's point must be above 0
        return res.status(400).json({ msg: "Point must be above 0" });
      }
      object2.add(req.body.payer, req.body.points);
    } else {
      if (comparePoint + req.body.points < 0) {
        // Checking if Oldest customer's becaming negative
        return res
          .status(400)
          .json({ msg: "Customer can not has below 0 point" });
      }
    }
    currentCustomer.points += req.body.points;
    object1.enqueue(req.body.payer, req.body.points, req.body.timestamp);
    res.status(200).json({ msg: "Successfully Added" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// @route    POST api/customers/spend
// @desc     Spend Customer point by oldest date first
// @access   Private

const spentPoint = async (req, res) => {
  try {
    const map2 = new Map();
    // set HashMap of user to find faster
    for (let i in object2.customers) {
      map2.set(object2.customers[i].payer, 0);
    }
    var totalSpent = req.body.points;
    if (object1.total < totalSpent) {
      // Checking if the input point is higher than total points we have
      return res.status(400).json({
        message: "a Spend points is higher than a total point of all users",
      });
    }
    // Dequeue 1 by 1 untill totalSpent reaches 0
    while (true) {
      if (totalSpent == 0) break;
      const userPoint = map2.get(object1.items[0].payer);
      if (totalSpent < object1.items[0].points) {
        object1.items[0].points -= totalSpent;
        object1.total -= totalSpent;
        map2.set(object1.items[0].payer, (points = userPoint - totalSpent));
        break;
      } else {
        totalSpent = totalSpent - object1.items[0].points;
        map2.set(
          object1.items[0].payer,
          (points = userPoint - object1.items[0].points)
        );
        object1.dequeue();
      }
    }

    var spendObj = []; // Creating return object
    map2.forEach((key, value) => {
      spendObj.push({ payer: value, points: key });
    });
    // Decreasing Points from Customers information object
    for (let j in object2.customers) {
      object2.customers[j].points += map2.get(object2.customers[j].payer);
    }
    return res.status(200).json(spendObj);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getBalance,
  addToQue,
  spentPoint,
};
