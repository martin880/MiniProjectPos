module.exports = (sequelize, Sequelize) => {
	const Order = sequelize.define("Orders", {
		date: Sequelize.DATE,
		userID: Sequelize.INTEGER,
		amount: Sequelize.INTEGER,
		paymentID: Sequelize.INTEGER,
	});
	return Order;
};
