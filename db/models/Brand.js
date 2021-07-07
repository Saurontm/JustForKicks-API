const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define("Brand", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Brand, { source: ["name"] });
  return Brand;
};
