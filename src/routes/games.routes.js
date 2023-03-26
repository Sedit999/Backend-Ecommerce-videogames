const express = require("express");
const {
  getGames,
  gettingGame,
  createGame,
} = require("../controllers/games.controllers");
const router = express.Router();

router.get("/get", getGames);
router.get("/game/:_id", gettingGame);
router.post("/create", createGame);

module.exports = router;
