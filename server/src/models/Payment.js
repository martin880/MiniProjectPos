module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("Payments", {
    method: Sequelize.ENUM("debit/kredit", "qris", "cash"),
  });
  return Payment;
};
