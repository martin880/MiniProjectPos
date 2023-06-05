module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define(
		"Products",
		{
			productName: Sequelize.STRING,
			category: Sequelize.STRING,
			harga: Sequelize.INTEGER,
			stock: Sequelize.INTEGER,
		},
		{
			paranoid: true,
			freezeTableName: true,
		}
	);

	return Product;
};
