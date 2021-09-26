const User = require("../../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const formData = {
        ...req.body,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_PASSPHRASE
        ).toString(),
      };
      const newUser = new User(formData);
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(401).json("wrong credentials!");
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_PASSPHRASE
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (OriginalPassword !== req.body.password)
        res.status(401).json("wrong credentials!");
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_KEY,
        { expiresIn: "3d" }
      );
      const { password, ...others } = user._doc;
      res.status(200).json({ others, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_PASSPHRASE
      ).toString();
    }
    try {
      const updateUSer = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUSer);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserAll: async (req, res) => {
    try {
      const user = await User.find();
      const usersNew = user.map((e) => {
        const { password, __v, ...others } = e._doc;
        return others;
      });
      res.status(200).json(usersNew);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("delete user successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
