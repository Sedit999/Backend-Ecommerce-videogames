const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const gamesRoutes = require("./routes/games.routes");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/games", gamesRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
