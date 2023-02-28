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

      nombre: {
        type: DataTypes.STRING,
      },

      precio_fraccion: { type: DataTypes.STRING },

      precio_fijo: {
        type: DataTypes.STRING,
      },
      proveedor: {
        type: DataTypes.STRING,
      },
    }
    // { timestamps: false }
  );
};
