const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Lote",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      ubicación: {
        type: DataTypes.STRING, //Lote y Manzana
        unique: true,
      },

      titular: {
        type: DataTypes.STRING,
      },

      m2: { type: DataTypes.INTEGER },

      mail: { type: DataTypes.STRING },
      telefono: { type: DataTypes.INTEGER },

      password: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );
};
