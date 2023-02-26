const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "LightMeter",
    {
      medidor: {
        type: DataTypes.STRING,
      },

      numero_lote: {
        type: DataTypes.STRING,
      },

      fecha: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );
};
