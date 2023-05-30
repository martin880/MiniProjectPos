module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("Users", {
		firstName: Sequelize.STRING,
		lastName: Sequelize.STRING,
		role: Sequelize.ENUM("Admin", "Kasir"),
		email: Sequelize.STRING,
		avatar: Sequelize.BLOB("long"),
		phonenumber: Sequelize.STRING,
		sex: Sequelize.STRING,
		address: Sequelize.STRING,
		ktp: Sequelize.STRING,
		password: Sequelize.STRING,
	});
	return User;
};
