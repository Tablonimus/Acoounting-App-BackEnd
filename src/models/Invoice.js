const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Invoice",
    {
      numero_comprobante: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },

      remitente: {
        type: DataTypes.STRING,
      },

      numero_lote: {
        type: DataTypes.STRING,
      },

      direccion: {
        type: DataTypes.STRING,
      },

      detalle: {
        type: DataTypes.STRING,
      },

      consumo: {
        type: DataTypes.STRING,
      },

      pagado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      total: {
        type: DataTypes.STRING,
      },

      fecha: {
        type: DataTypes.STRING,
      },
    }
    // { timestamps: false }
  );
};
