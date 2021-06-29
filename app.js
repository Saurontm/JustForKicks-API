const express = require("express");
var products = require("./products");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/products", (req, res) => {
  res.json(products);
});

app.delete("/products/:productID", (req, res) => {
  const { productID } = req.params;
  const foundProduct = products.find((sneaker) => sneaker.id === +productID);
  if (foundProduct) {
    products = products.filter((sneaker) => sneaker.id !== +productID);
    res.status(204).end();
  } else {
    res.status(404).json({ message: `Sneaker not found of ${productID}` });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
