const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Invoice",
    {
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
        defaultValue: false,
      },

      intereses: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      a_cuenta: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

      total: {
        type: DataTypes.STRING,
      },

      importe_facturado: {
        type: DataTypes.STRING,
      },
    }
    // { timestamps: false }
  );
};
