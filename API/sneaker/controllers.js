let products = require("../../products");
const slugify = require("slugify");

exports.sneakerFetch = (req, res) => {
  res.json(products);
};

exports.deleteSneaker = (req, res) => {
  const { productID } = req.params;
  const foundProduct = products.find((sneaker) => sneaker.id === +productID);
  if (foundProduct) {
    products = products.filter((sneaker) => sneaker.id !== +productID);
    res.status(204).end();
  } else {
    res.status(404).json({ message: `Sneaker not found of ${productID}` });
  }
};

exports.createSneaker = (req, res) => {
  const id = products.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newSneaker = { id: id, slug: slug, ...req.body };
  products.push(newSneaker);
  res.status(201).json(newSneaker);
};

exports.updateSneaker = (req, res) => {
  const { productID } = req.params;
  const foundProduct = products.find((sneaker) => sneaker.id === +productID);
  if (foundProduct) {
    for (const key in req.body) foundProduct[key] = req.body[key];
    foundProduct.slug = slugify(foundProduct.name, { lower: true });
    foundProduct.price = +foundProduct.price;
    res.status(204).end();
  } else {
    res.status(404).json({ message: `Sneaker not found of ${productID}` });
  }
};
