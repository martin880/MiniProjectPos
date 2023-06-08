const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const categoryController = {
  getAll: async (req, res) => {
    try {
      const category = await db.CategoryProduct.findAll();
      return res.send(category);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const category = await db.CategoryProduct.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(category);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editCategoryProduct: async (req, res) => {
    try {
      const { categoryName } = req.body;
      await db.CategoryProduct.update(
        {
          categoryName,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.CategoryProduct.findOne({
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
  insertCategoryProduct: async (req, res) => {
    try {
      const { categoryName } = req.body;
      await db.CategoryProduct.create({
        categoryName,
      });
      return await db.CategoryProduct.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteCategoryProduct: async (req, res) => {
    try {
      await db.CategoryProduct.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.CategoryProduct.findAll().then((result) =>
        res.send(result)
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = categoryController;
