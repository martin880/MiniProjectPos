module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Products",
    {
      productName: Sequelize.STRING,
      harga: Sequelize.INTEGER,
      stock: Sequelize.INTEGER,
      photoProduct_url: Sequelize.STRING,
      photoProduct_blob: Sequelize.BLOB("long"),
    },
    {
      paranoid: true,
    }
  );

  return Product;
};
