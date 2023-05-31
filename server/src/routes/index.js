const categoryRoutes = require("./categoryProducts");
const orderRoutes = require("./order");
const productRoutes = require("./product");
const paymentRoutes = require("./payment");
const userRoutes = require("./user");
const historyRoutes = require("./stockHistory");

module.exports = {
  categoryRoutes,
  productRoutes,
  paymentRoutes,
  userRoutes,
  orderRoutes,
  historyRoutes,
};
