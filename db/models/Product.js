module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Product", {
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    imageURL: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
  });
};
