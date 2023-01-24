const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Batch",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      numero: {
        type: DataTypes.STRING, //Lote y Manzana
        unique: true,
        primaryKey: true,
      },

      ubicacion: {
        type: DataTypes.STRING, //Lote y Manzana
        unique: true,
      },

      m2: { type: DataTypes.STRING },

      titular: {
        type: DataTypes.STRING,
      },

      mail: { type: DataTypes.STRING },

      telefono: { type: DataTypes.STRING },
      telefono2: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );
};
