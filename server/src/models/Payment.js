module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Orders", {
    channel: Sequelize.ENUM("debit/kredit", "qris", "cash"),
  });
  return Order;
};
