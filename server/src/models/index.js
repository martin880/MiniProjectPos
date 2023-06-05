"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Token = require("./Token")(sequelize, Sequelize);
db.Order = require("./Order")(sequelize, Sequelize);
db.CategoryProduct = require("./CategoryProduct")(sequelize, Sequelize);
db.OrderDetail = require("./OrderDetail")(sequelize, Sequelize);
db.Payment = require("./Payment")(sequelize, Sequelize);
db.Product = require("./Product")(sequelize, Sequelize);
db.StockHistory = require("./StockHistory")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

module.exports = db;

db.Product.belongsTo(db.CategoryProduct, {
  foreignKey: "categoryId",
  as: "Category",
});

db.OrderDetail.belongsTo(db.Product, {
  foreignKey: "productId",
  as: "Product",
});

db.OrderDetail.belongsTo(db.Order, {
  foreignKey: "orderId",
  as: "Order",
});

db.Order.belongsTo(db.User, {
  foreignKey: "userId",
  as: "User",
});

db.Order.belongsTo(db.Payment, {
  foreignKey: "paymentId",
  as: "Payment",
});

db.StockHistory.belongsTo(db.Product, {
  foreignKey: "productId",
  as: "Product",
});
