const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  verifyUser,
  loginUser,
} = require("../controllers/user.controllers");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/get", auth, getUsers);
router.post("/post", createUser);
router.put("/put", auth, updateUser);
router.post("/verify", auth, verifyUser);
router.post("/login", loginUser);

module.exports = router;
