const { Product } = require("../../db/models");

exports.fetchSneaker = async (productID, next) => {
  try {
    const foundSneaker = await Product.findByPk(productID);
    return foundSneaker;
  } catch (error) {
    next(error);
  }
};

exports.sneakerFetch = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.createSneaker = async (req, res, next) => {
  try {
    const newSneaker = await Product.create(req.body);
    res.status(201).json(newSneaker);
  } catch (error) {
    next(error);
  }
};

exports.deleteSneaker = async (req, res, next) => {
  try {
    await req.sneaker.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateSneaker = async (req, res, next) => {
  try {
    await req.sneaker.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
