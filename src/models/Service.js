const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Service",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING, //Lote y Manzana
      },

      price: {
        type: DataTypes.STRING,
      },
      vendor: {
        type: DataTypes.STRING,
      },
    }
    // { timestamps: false }
  );
};
