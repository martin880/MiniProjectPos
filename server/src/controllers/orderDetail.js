const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);
const orderDetailController = {
  getAll: async (req, res) => {
    try {
      const orderDetail = await db.OrderDetail.findAll();
      return res.send(orderDetail);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const orderDetail = await db.OrderDetail.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(orderDetail);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editOrderDetail: async (req, res) => {
    try {
      const { date, amount } = req.body;
      await db.OrderDetail.update(
        {
          date,
          amount,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.OrderDetail.findOne({
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
  insertOrderDetailAndOrder: async (req, res) => {
    try {
      const { amount, userId, orderList, paymentId } = req.body;
      const invoice = moment().format("L").replaceAll("/", "") + nanoid();
      await db.Order.create({
        amount,
        userId,
        paymentId,
        invoice,
      });
      orderList.map(async (val) => {
        try {
          console.log(val);
          await db.OrderDetail.create({
            quantity: val.quantity,
            productId: val.productId,
            orderId: val.orderId,
          }).then(async () => {
            return await db.OrderDetail.findAll({
              order: [["id", "desc"]],
            }).then((result) => {
              res.send(result);
            });
          });
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteOrderDetail: async (req, res) => {
    try {
      await db.OrderDetail.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.OrderDetail.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
  getOrderDetailByDate: async (req, res) => {
    try {
      const { DateFrom, DateTo } = req.body;
      const product = await db.OrderDetail.findAll({
        where: {
          createdAt: { [Op.between]: [DateFrom, DateTo] },
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
};

module.exports = orderDetailController;
