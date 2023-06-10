const userController = require("./users");
const orderController = require("./Order");
const paymentController = require("./payment");
const categoryController = require("./categoryProducts");
const historyController = require("./stockHistory");
const productController = require("./product");
const orderDetailController = require("./orderDetail");
module.exports = {
  orderDetailController,
  userController,
  orderController,
  paymentController,
  categoryController,
  historyController,
  productController,
};
