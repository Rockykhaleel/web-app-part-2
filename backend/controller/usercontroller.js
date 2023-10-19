const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Users = require("../models/user_model");
const isAuthenticated = require("../middleware/protectedRoute");

module.exports={
    register: async (req, res) => {
        const { name, email, username, password } = req.body;
        //Hash Password
        const hashedpassword = await bcrypt.hash(password, 12);
        const newUser = new Users({
          name,
          email,
          password: hashedpassword,
          username,
        });
        try {
          const resp = await newUser.save();
          res.status(201).send({ message: "User registered", resp });
        } catch (error) {
          res.status(500).send({ message: "Some Internal Server Error" });
        }
      },
      login: async (req, res) => {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });
        if (!user) {
          return res.status(400).send("Username is not registered with US");
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const payload = {
            id: user._id,
            name: user.name,
            username: user.username,
          };
          const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).json({ result: { token: jwtToken, user: payload } })
          // res
          //   .status(200)
            // .send({ message: "Login Successfull", jwt: jwtToken, payload });
        } else {
          return res.status(400).send({ message: "Invalid Credentials" });
        }
      },
      profile:async (req, res) => {
        console.log(req.user);
        const date = new Date(req.user.iat * 1000);
        res.send({ messgae: "Profile page", user: req.user, date });
      }
}