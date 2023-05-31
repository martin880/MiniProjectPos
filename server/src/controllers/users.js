const db = require("../models");
const bcrypt = require("bcrypt");

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
      //   console.log("asd");
      const user = await db.User.findOne({
        where: {
          phonenum,
        },
      });

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
};

module.exports = userController;
