module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Orders", {
    date: Sequelize.DATE,
    amount: Sequelize.INTEGER,
  });
  return Order;
};
