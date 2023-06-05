const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const paymentController = {
  getAll: async (req, res) => {
    try {
      const payment = await db.Payment.findAll();
      return res.send(payment);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const payment = await db.Payment.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(payment);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editPayment: async (req, res) => {
    try {
      const { channel } = req.body;
      await db.Payment.update(
        {
          channel,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Payment.findOne({
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
  insertPayment: async (req, res) => {
    try {
      const { channel } = req.body;
      await db.Payment.create({
        channel,
      });
      return await db.Payment.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deletePayment: async (req, res) => {
    try {
      await db.Payment.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Payment.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = paymentController;
