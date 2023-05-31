module.exports = (sequelize, Sequelize) => {
  const CategoryName = sequelize.define("Category", {
    categoryName: Sequelize.STRING,
  });
  return CategoryName;
};
