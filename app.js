const express = require("express");
const products = require("./products");
const cors = require("cors");

const app = express();

app.use(cors());

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

app.get("/products", (req, res) => {
  res.json(products);
});