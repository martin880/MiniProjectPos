const categoryRoutes = require("./categoryProducts");
const orderRoutes = require("./order");
const productRoutes = require("./product");
const paymentRoutes = require("./payment");
const userRoutes = require("./user");
const historyRoutes = require("./stockHistory");
const orderDetailRoutes = require("./orderDetail");
module.exports = {
  orderDetailRoutes,
  categoryRoutes,
  productRoutes,
  paymentRoutes,
  userRoutes,
  orderRoutes,
  historyRoutes,
};
