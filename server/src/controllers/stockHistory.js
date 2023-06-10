const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const historyController = {
  getAll: async (req, res) => {
    try {
      const history = await db.StockHistory.findAll();
      return res.send(history);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const history = await db.StockHistory.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(history);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editStockHistory: async (req, res) => {
    try {
      const { date, quantity, activity } = req.body;
      await db.StockHistory.update(
        {
          date,
          quantity,
          activity,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.StockHistory.findOne({
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
  insertStockHistory: async (req, res) => {
    try {
      const { date, quantity, activity } = req.body;
      await db.StockHistory.create({
        date,
        quantity,
        activity,
      });
      return await db.StockHistory.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteStockHistory: async (req, res) => {
    try {
      await db.StockHistory.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.StockHistory.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
  
};

module.exports = historyController;
