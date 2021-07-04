const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sneakerRoutes = require("./API/sneaker/routes");
const app = express();
const db = require("./db/models");

app.use(cors());
app.use(bodyParser.json());
app.use("/products", sneakerRoutes);

const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
