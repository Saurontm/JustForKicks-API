const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sneakerRoutes = require("./API/sneaker/routes");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", sneakerRoutes);

// app.get("/products", (req, res) => {
//   res.json(products);
// });

// app.delete("/products/:productID", (req, res) => {
//   const { productID } = req.params;
//   const foundProduct = products.find((sneaker) => sneaker.id === +productID);
//   if (foundProduct) {
//     products = products.filter((sneaker) => sneaker.id !== +productID);
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: `Sneaker not found of ${productID}` });
//   }
// });

// app.post("/products", (req, res) => {
//   const id = products.length + 1;
//   const slug = slugify(req.body.name, { lower: true });
//   const newSneaker = { id: id, slug: slug, ...req.body };
//   products.push(newSneaker);
//   res.status(201).json(newSneaker);
// });

// app.put("/products/:productID", (req, res) => {
//   const { productID } = req.params;
//   const foundProduct = products.find((sneaker) => sneaker.id === +productID);
//   if (foundProduct) {
//     for (const key in req.body) foundProduct[key] = req.body[key];
//     foundProduct.slug = slugify(foundProduct.name, { lower: true });
//     foundProduct.price = +foundProduct.price;
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: `Sneaker not found of ${productID}` });
//   }
// });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
