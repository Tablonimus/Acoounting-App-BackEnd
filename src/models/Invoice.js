const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Invoice",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      numero_comprobante: {
        type: DataTypes.STRING, //Lote y Manzana

        unique: true,
      },

      consumo: {
        type: DataTypes.STRING, //Lote y Manzana
      },

      pxKw: {
        type: DataTypes.STRING,
      },

      dirección: {
        type: DataTypes.STRING, //Lote y Manzana
      },
      fecha: {
        type: DataTypes.STRING,
      },
    }
    // { timestamps: false }
  );
};
