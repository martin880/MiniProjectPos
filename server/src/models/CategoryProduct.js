module.exports = (sequelize, Sequelize) => {
  const CategoryName = sequelize.define("Categories", {
    categoryName: Sequelize.STRING,
  });
  return CategoryName;
};
