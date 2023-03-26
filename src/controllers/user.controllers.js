const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error obteniendo los datos" });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const payload = {
      user: { id: newUser._id },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error", error });
  }
};

const updateUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al actualizar el usuario" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    const correctPass = await bcryptjs.compare(password, foundUser.password);

    if (!correctPass) {
      return await res.status(400).json({ msg: "La contraseña es incorrecta" });
    }

    const payload = {
      user: {
        id: foundUser._id,
      },
    };
    if (email && correctPass) {
      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 3600000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } else {
      res.json({ msg: "Hubo un error", error });
    }
  } catch (error) {
    res.json({ msg: "Hubo un error", error });
  }
};

module.exports = { getUsers, createUser, updateUser, verifyUser, loginUser };
