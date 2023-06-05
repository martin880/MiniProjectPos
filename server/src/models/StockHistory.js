const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const StockHistory = sequelize.define("StockHistory", {
    date: Sequelize.DATE,
    quantity: Sequelize.INTEGER,
    activity: Sequelize.ENUM("IN", "OUT"),
  });

  return StockHistory;
};
