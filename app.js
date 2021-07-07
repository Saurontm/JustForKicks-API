const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sneakerRoutes = require("./API/sneaker/routes");
const brandRoutes = require("./API/brand/routes");
const app = express();
const db = require("./db/models");

app.use(cors());
app.use(bodyParser.json());
app.use("/products", sneakerRoutes);
app.use("/brands", brandRoutes);
app.use("/media", express.static("media"));

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});

app.use((err, res, next) => {
  res.status(404).json({ message: "Path Not Found." });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
