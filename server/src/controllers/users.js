const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const private_key = process.env.private_key;
const { nanoid } = require("nanoid");
const moment = require("moment");
const url = process.env.URL;
const mailer = require("../lib/mailer");
const image_url = process.env.URL_IMAGE;
const sharp = require("sharp");
const user = require("../models/user");
const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.User.findAll();
			return res.send(user);
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		try {
			const user = await db.User.findOne({
				where: {
					id: req.params.id,
				},
			});
			return res.send(user);
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getUserByName: async (req, res) => {
		try {
			const search = req.query.search_query || "";
			const user = await db.User.findAll({
				where: {
					[Op.or]: [
						{ firstName: { [Op.like]: "%" + search + "%" } },
						{ lastName: { [Op.like]: "%" + search + "%" } },
					],
				},
			});
			return res.send(user);
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	register: async (req, res) => {
		try {
			const {
				firstName,
				lastName,
				role,
				email,
				phoneNumber,
				sex,
				address,
				KTP,
				password,
				avatar,
			} = req.body;
			const hashPassword = await bcrypt.hash(password, 10);
			console.log(hashPassword);

			await db.User.create({
				firstName,
				lastName,
				role,
				email,
				phoneNumber,
				sex,
				address,
				KTP,
				password: hashPassword,
				avatar,
			});

			return res.send({
				message: "register berhasil",
				private_key,
			});
		} catch (err) {
			console.log(err.message);
			return res.status(500).send(err.message);
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			const user = await db.Us.findOne({
				where: {
					email,
				},
			});

			//    console.log(user);

			if (user) {
				const match = await bcrypt.compare(password, user.dataValues.password);
				if (match) {
					const payload = {
						id: user.dataValues.id,
					};
					const token = jwt.sign(payload, private_key, {
						expiresIn: "1h",
					});

					console.log(token);
					//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6InVkaW4yIiwiYWRkcmVzcyI6ImJhdGFtIiwicGFzc3dvcmQiOiIkMmIkMTAkWUkvcTl2dVdTOXQ0R1V5a1lxRGtTdWJnTTZwckVnRm9nZzJLSi9FckFHY3NXbXBRUjFOcXEiLCJlbWFpbCI6InVkaW4yQG1haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwiZGVsZXRlZEF0IjpudWxsLCJDb21wYW55SWQiOm51bGwsImlhdCI6MTY4NDQ4MzQ4NSwiZXhwIjoxNjg0NDgzNTQ1fQ.Ye5l7Yml1TBWUgV7eUnhTVQjdT3frR9E0HXNxO7bTXw;

					return res.send({
						message: "login berhasil",
						value: user,
						token,
					});
				} else {
					throw new Error("wrong password");
				}
			} else {
				throw new Error("user not found");
			}
		} catch (err) {
			console.log(err.message);
			return res.status(500).send({ message: err.message });
		}
	},
	loginV2: async (req, res) => {
		try {
			const { email, password } = req.body;
			//   console.log("asd");
			const user = await db.User.findOne({
				where: {
					email,
				},
			});

			if (user) {
				const match = await bcrypt.compare(password, user.dataValues.password);
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
					//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6InVkaW4yIiwiYWRkcmVzcyI6ImJhdGFtIiwicGFzc3dvcmQiOiIkMmIkMTAkWUkvcTl2dVdTOXQ0R1V5a1lxRGtTdWJnTTZwckVnRm9nZzJLSi9FckFHY3NXbXBRUjFOcXEiLCJlbWFpbCI6InVkaW4yQG1haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwiZGVsZXRlZEF0IjpudWxsLCJDb21wYW55SWQiOm51bGwsImlhdCI6MTY4NDQ4MzQ4NSwiZXhwIjoxNjg0NDgzNTQ1fQ.Ye5l7Yml1TBWUgV7eUnhTVQjdT3frR9E0HXNxO7bTXw;

					return res.send({
						message: "login berhasil",
						// value: user,
						token: token.dataValues.token,
					});
				} else {
					throw new Error("wrong password");
				}
			} else {
				throw new Error("user not found");
			}
		} catch (err) {
			console.log(err.message);
			return res.status(500).send({ message: err.message });
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

// hello3 salt 1 => abc123456c=> hello3 =>
// hello3a salt 2 => abc654321 => heallo3 =>

// hoc => token localstorage => req backend get
// user by id => respond => dispatch

// http://localhost:3000/forgot-password/DIjeA2YhdvH06CbRG1Mmk
