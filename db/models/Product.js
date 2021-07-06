const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING, unique: true },
    price: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Product, { source: ["name"] });
  return Product;
};
