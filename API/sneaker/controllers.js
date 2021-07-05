const slugify = require("slugify");
const { Product } = require("../../db/models");

exports.sneakerFetch = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
