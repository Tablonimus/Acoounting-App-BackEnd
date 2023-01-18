const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Luz",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      consumo: {
        type: DataTypes.STRING, //Lote y Manzana
        unique: true,
      },

      pxKw: {
        type: DataTypes.STRING,
      },
      segundoNombre: {
        type: DataTypes.STRING,
      },
      apellido: {
        type: DataTypes.STRING,
      },

      mail: {type: DataTypes.STRING},
      telefono: { type: DataTypes.INTEGER },
      
      password: {type: DataTypes.STRING},
    },
    { timestamps: false }
  );
};
