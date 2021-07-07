const { Product, Brand } = require("../../db/models");

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
      attributes: { exclude: [["brandID"], "createdAt", "updatedAt"] },
      include: { model: Brand, as: "brand", attributes: ["name"] },
    });
    res.json(products);
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
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedSneaker = await req.sneaker.update(req.body);
    res.json(updatedSneaker);
  } catch (error) {
    next(error);
  }
};
