const { Product, Brand } = require("../../db/models");

exports.fetchBrand = async (brandID, next) => {
  try {
    const foundBrand = await Brand.findByPk(brandID);
    return foundBrand;
  } catch (error) {
    next(error);
  }
};

exports.brandFetch = async (req, res, next) => {
  try {
    const brands = await Brand.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: { model: Product, as: "products", attributes: ["id"] },
    });
    res.json(brands);
  } catch (error) {
    next(error);
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newBrand = await Brand.create(req.body);
    res.status(201).json(newBrand);
  } catch (error) {
    next(error);
  }
};

exports.createSneaker = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.brandID = req.brand.id;
    const newSneaker = await Product.create(req.body);
    res.status(201).json(newSneaker);
  } catch (error) {
    next(error);
  }
};
