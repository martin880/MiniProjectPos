module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("Payments", {
    channel: Sequelize.ENUM("debit/kredit", "qris", "cash"),
  });
  return Payment;
};
