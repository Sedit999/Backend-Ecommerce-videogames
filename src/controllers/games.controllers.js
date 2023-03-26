const Game = require("../models/Games");

const getGames = async (req, res) => {
  try {
    const games = await Game.find({});
    res.json({ games });
  } catch (err) {
    res.status(500).json({ msg: "hubo un error al obtener los datos" });
  }
};

const gettingGame = async (req, res) => {
  const { _id } = req.params;
  try {
    const game = await Game.find({ _id });
    res.json({ game });
  } catch (err) {
    res.status(500).json({ msg: "hubo un error al obtener los datos" });
  }
};

const createGame = async (req, res) => {
  const {
    name,
    publisher,
    releasedate,
    price,
    pricetxt,
    genre,
    esrbrating,
    noplayer,
    languajes,
    img,
  } = req.body;

  try {
    const newGame = await Game.create({
      name,
      publisher,
      releasedate,
      price,
      pricetxt,
      genre,
      esrbrating,
      noplayer,
      languajes,
      img,
    });
    res.json({ newGame });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

module.exports = { getGames, gettingGame, createGame };
