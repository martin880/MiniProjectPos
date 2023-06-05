const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const productController = {
	getAll: async (req, res) => {
		try {
			const product = await db.Product.findAll();
			return res.send(product);
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		try {
			const product = await db.Product.findOne({
				where: {
					id: req.params.id,
				},
			});
			return res.send(product);
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	editProduct: async (req, res) => {
		try {
			const { productName, category, harga, stock } = req.body;
			await db.Product.update(
				{
					productName,
					category,
					harga,
					stock,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.Product.findOne({
				where: {
					id: req.params.id,
				},
			}).then((result) => res.send(result));
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	insertProduct: async (req, res) => {
		try {
			const { productName, category, harga, stock } = req.body;
			await db.Product.create({
				productName,
				category,
				harga,
				stock,
			});
			return await db.Product.findAll().then((result) => {
				res.send(result);
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	deleteProduct: async (req, res) => {
		try {
			await db.Product.destroy({
				where: {
					//  id: req.params.id

					//   [Op.eq]: req.params.id

					id: req.params.id,
				},
			});
			return await db.Product.findAll().then((result) => res.send(result));
		} catch (err) {
			console.log(err.message);
			return res.status(500).send({
				error: err.message,
			});
		}
	},
};

module.exports = productController;
