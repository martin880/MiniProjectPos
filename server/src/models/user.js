module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("Users", {
		firstName: Sequelize.STRING,
		lastName: Sequelize.STRING,
		status: Sequelize.ENUM("ACTIVE", "INACTIVE"),
		role: Sequelize.ENUM("ADMIN", "CASHIER"),
		email: Sequelize.STRING,
		avatar: Sequelize.BLOB("long"),
		avatar_url: Sequelize.TEXT,
		phoneNumber: Sequelize.STRING,
		sex: Sequelize.ENUM("MALE", "FEMALE"),
		address: Sequelize.STRING,
		KTP: Sequelize.STRING,
		password: Sequelize.STRING,
	});
	return User;
};
