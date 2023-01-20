const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "News",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING, //Lote y Manzana
      },

      subtitle: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    }
    // { timestamps: false }
  );
};
