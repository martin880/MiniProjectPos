module.exports = (sequelize, Sequelize) => {
	const OrderDetail = sequelize.define("OrderDetails", {
		orderID: Sequelize.INTEGER,
		productID: Sequelize.INTEGER,
		quantity: Sequelize.INTEGER,
	});
	return OrderDetail;
};
