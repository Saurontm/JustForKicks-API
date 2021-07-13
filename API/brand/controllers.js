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
    const foundBrand = await Brand.findOne({
      where: { userId: req.user.id },
    });
    if (foundBrand) {
      const err = new Error("You already own a Brand!");
      err.status = 400;
      return next(err);
    }

    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newBrand = await Brand.create(req.body);
    res.status(201).json(newBrand);
  } catch (error) {
    next(error);
  }
};

exports.createSneaker = async (req, res, next) => {
  try {
    if (req.user.id === req.brand.userId) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      req.body.brandID = req.brand.id;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
