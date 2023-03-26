const mongoose = require("mongoose");
/* const uniqueValidator = require("mongoose-unique-validator"); */

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      /* unique: true, */
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
/* userSchema.plugin(uniqueValidator, { message: "email is already registered" }); */
const User = mongoose.model("User", userSchema);
module.exports = User;
