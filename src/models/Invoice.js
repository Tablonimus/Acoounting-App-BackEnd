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

      total: {
        type: DataTypes.STRING,
      },

    
    }
    // { timestamps: false }
  );
};
