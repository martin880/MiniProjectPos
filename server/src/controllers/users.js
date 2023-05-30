// const db = require("../models");
// const bcrypt = require("bcrypt");

// const userController = {
// 	getAll: async (req, res) => {
// 		try {
// 			const user = await db.User.findAll();

// 			return res.send(user);
// 		} catch (err) {
// 			res.status(500).send({
// 				message: err.message,
// 			});
// 		}
// 	},
// 	getById: async (req, res) => {
// 		const user = await db.User.findOne({
// 			where: {
// 				id: req.params.id,
// 			},
// 		});
// 		return res.send(user);
// 	},
// 	register: async (req, res, next) => {
// 		try {
// 			const {
// 				firstName,
// 				lastName,
// 				role,
// 				email,
// 				avatar,
// 				phoneNumber,
// 				sex,
// 				address,
// 				KTP,
// 				password,
// 			} = req.body;
// 			const hashPassword = await bcrypt.hash(password, 10);
// 			console.log(hashPassword);
// 			const result = await db.sequelize.transaction(async () => {
// 				const newUser = await db.User.create({
// 					firstName,
// 					lastName,
// 					role,
// 					email,
// 					avatar,
// 					phoneNumber,
// 					sex,
// 					address,
// 					KTP,
// 					password: hashPassword,
// 				});
// 				console.log(newUser.dataValues);
// 			});
// 			return res.send(hashPassword);
// 		} catch (err) {
// 			res.status(500).send({
// 				message: err.message,
// 			});
// 		}
// 	},
// };

// module.exports = userController;
