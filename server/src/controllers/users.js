const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const url = process.env.URL;
// const mailer = require("../lib/mailer");
const image_url = process.env.URL_IMAGE;
const sharp = require("sharp");

const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.User.findAll();

			return res.send(user);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const user = await db.User.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(user);
	},
	register: async (req, res, next) => {
		try {
			const {
				firstName,
				lastName,
				role,
				email,
				avatar,
				phoneNumber,
				sex,
				address,
				KTP,
				password,
			} = req.body;
			const hashPassword = await bcrypt.hash(password, 10);
			console.log(hashPassword);
			const result = await db.sequelize.transaction(async () => {
				const newUser = await db.User.create({
					firstName,
					lastName,
					role,
					email,
					avatar,
					phoneNumber,
					sex,
					address,
					KTP,
					password: hashPassword,
				});
				console.log(newUser.dataValues);
			});
			return res.send(hashPassword);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	loginV2: async (req, res) => {
		try {
			const { phonenum, pin } = req.body;
			// console.log(req.query);
			const user = await db.User.findOne({
				where: {
					phonenum,
				},
			});
			console.log(user);
			if (user) {
				const match = await bcrypt.compare(pin, user.dataValues.password);
				if (match) {
					const payload = {
						id: user.dataValues.id,
					};

					const generateToken = nanoid();
					console.log(nanoid());
					const token = await db.Token.create({
						expired: moment().add(1, "days").format(),
						token: generateToken,
						payload: JSON.stringify(payload),
					});
					console.log(token);

					return res.status(200).send({
						message: "you are succefully log in",
						value: user,
						token: token.dataValues.token,
					});
				} else {
					throw new Error("wrong phoneNumber/password");
				}
			} else {
				throw new Error("user is not found");
			}
		} catch (err) {
			console.log(err.message);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getByToken: async (req, res, next) => {
		try {
			let { token } = req.query;
			console.log(token);
			let payload = await db.Token.findOne({
				where: {
					token,
					expired: {
						[db.Sequelize.Op.gte]: moment().format(),
					},
					valid: true,
				},
			});
			if (!payload) {
				throw new Error("token has expired");
			}
			console.log(payload.dataValues);
			user = await db.User.findOne({
				where: {
					id: JSON.parse(payload.dataValues.payload).id,
				},
			});
			delete user.dataValues.password;

			req.user = user;
			next();
		} catch (err) {
			console.log(err);
			return res.status(500).send({ message: err.message });
		}
	},
	getUserByToken: async (req, res) => {
		res.status(200).send(req.user);
	},
	generateTokenByEmail: async (req, res) => {
		try {
			const { email } = req.query;
			const user = await db.User.findOne({
				where: {
					email,
				},
			});

			if (user.dataValues) {
				await db.Token.update(
					{
						valid: false,
					},
					{
						where: {
							payload: JSON.stringify({ id: user.dataValues.id }),
							Status: "FORGOT-PASSWORD",
						},
					}
				);
				const generateToken = nanoid();
				const token = await db.Token.create({
					expired: moment().add(60, "minutes").format(),
					token: generateToken,
					payload: JSON.stringify({ id: user.dataValues.id }),
					status: "FORGOT-PASSWORD",
				});

				mailer({
					subject: "hello,",
					to: user.dataValues.email,
					text: url + token.dataValues.token,
				});

				return res.send({ message: "please check your email" });
			} else {
				throw new Error("user is not found");
			}
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},

	changePassword: async (req, res) => {
		try {
			console.log(req.body);
			const { token } = req.query;
			const { password } = req.body.user;
			const { id } = req.user;
			console.log(id);

			const hashPassword = await bcrypt.hash(password, 10);

			await db.User.update(
				{
					password: hashPassword,
				},
				{
					where: {
						id,
					},
				}
			);

			await db.Token.update(
				{
					valid: false,
				},
				{
					where: {
						token,
					},
				}
			);

			res.send({
				message: "password successfully updated",
			});
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	updateProfile: async (req, res) => {
		try {
			const { firstName, lastName, phoneNumber, email, address, avatar } =
				req.body;
			await db.User.update(
				{
					// firstName,
					// lastName,
					email,
					phoneNumber,
					address,
					avatar,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return res.status(200).send({
				message: "your account has been updated",
			});
		} catch (err) {
			console.log(err.message);
			return res.status(500).send(err.message);
		}
	},
	deleteUser: async (req, res) => {
		try {
			await db.User.destroy({
				where: {
					//  id: req.params.id

					//   [Op.eq]: req.params.id

					id: req.params.id,
				},
			});
			return await db.User.findAll().then((result) => res.send(result));
		} catch (err) {
			console.log(err.message);
			return res.status(500).send({
				error: err.message,
			});
		}
	},

	uploadAvatar: async (req, res) => {
		const { filename } = req.filename;
		await db.User.update(
			{
				avatar_url: image_url + filename,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		),
			await db.User.findOne({
				where: {
					id: req.params.id,
				},
			}).then((result) => res.send(result));
	},
	renderAvatar: async (req, res) => {
		try {
			await db.User.findOne({
				where: {
					id: req.params.id,
				},
			}).then((result) => {
				res.set("content-type", "image/png");
				res.send(result.dataValues.avatar_blob);
			});
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = userController;
