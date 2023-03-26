const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  publisher: {
    type: String,
    require: true,
  },
  releasedate: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  pricetxt: {
    type: String,
    require: true,
  },
  genre: {
    type: [String],
    require: true,
  },
  esrbrating: {
    type: String,
    require: true,
  },
  noplayer: {
    type: String,
    require: true,
  },
  languajes: {
    type: [String],
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  info: {
    type: String,
    require: true,
  },
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
