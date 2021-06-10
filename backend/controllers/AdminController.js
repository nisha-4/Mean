const Admin = require("../models/AdminModel");
const User = require("../models/UserModel");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await Admin.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const user = new Admin({
      email,
      password,
    });
    const savedUser = await user.save();
    if (savedUser) {
      const token = jwt.sign(
        {
          _id: savedUser._id,
        }, "Stack", {

        expiresIn: '1m' // expires in 24 hours
      },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        message: "Registration successfull",
        data: [
          {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            token,
          }
        ]
      });
      res.status(200).json({});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

const CreateUser = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body

    const newUser = new User(req.body);

    const saveUser = await newUser.save();
    if (saveUser) {
      res.status(200).json({ message: "User registered", data: [saveUser] });
    } else {
      res.status(500).json({ message: "Unable register", data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error, data: [] });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExists = await Admin.findOne({ email });
    if (adminExists && (await adminExists.matchPassword(password))) {
      const token = jwt.sign(
        {
          _id: adminExists._id,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        _id: adminExists._id,
        name: adminExists.name,
        email: adminExists.email,
        token,
      });
    } else {
      res.status(401).json({
        error: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};
const DeleteUser = async (req, res) => {
  const { userId } = req.params;

  User.findByIdAndDelete(userId).then((deletedUser) =>
    res
      .status(200)
      .json({ message: "User Deleted Successfully", data: [{ deletedUser }] })
  );
};
const getAllUsers = async (req, res) => {
  try {

    var findUsers = await User.find({});
    if (findUsers) {
      res.status(200).json({ message: "found users", data: [findUsers] })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", data: [] });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId
    var findUsers = await User.find({ _id: userId });
    if (findUsers) {
      res.status(200).json({ message: "found users", data: [findUsers] })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", data: [] });
  }
};

module.exports = {
  Register,
  Login,
  CreateUser,
  DeleteUser,
  getAllUsers,
  getUserById,
};