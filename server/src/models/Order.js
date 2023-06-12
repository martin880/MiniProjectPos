module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Orders", {
    amount: Sequelize.INTEGER,
    invoice: Sequelize.STRING,
  });
  return Order;
};
