const userController = require("./users");
const orderController = require("./Order");
const paymentController = require("./payment");
const categoryController = require("./categoryProducts");
const historyController = require("./stockHistory");
const productController = require("./product");

module.exports = {
  userController,
  orderController,
  paymentController,
  categoryController,
  historyController,
  productController,
};
