const slugify = require("slugify");
const { Product } = require("../../db/models");

exports.sneakerFetch = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSneaker = async (req, res) => {
  try {
    const newSneaker = await Product.create(req.body);
    res.status(201).json(newSneaker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSneaker = async (req, res) => {
  const { productID } = req.params;
  try {
    const foundSneaker = await Product.findByPk(productID);
    if (foundSneaker) {
      await foundSneaker.destroy();
      res.status(204).end();
    }
  } catch (error) {
    res.status(404).json({ message: "product not found" });
  }
};

exports.updateSneaker = async (req, res) => {
  const { productID } = req.params;
  try {
    const foundSneaker = await Product.findByPk(productID);
    if (foundSneaker) {
      await foundSneaker.update(req.body);
      res.status(204).end();
    }
  } catch (error) {
    res.status(404).json({ message: "product not found" });
  }
};
