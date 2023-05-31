module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      productName: Sequelize.STRING,
      harga: Sequelize.INTEGER,
      stock: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );

  return Product;
};
