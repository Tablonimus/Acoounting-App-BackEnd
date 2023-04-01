const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Batch",
    {
      // id: {
      //   type: DataTypes.UUID,
      //   defaultValue: DataTypes.UUIDV4,
      // },

      numero_lote: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },

      m2: { type: DataTypes.STRING },

      medidor_luz: { type: DataTypes.ARRAY(DataTypes.STRING) },

      ubicacion: {
        type: DataTypes.STRING,
      },

      titular: {
        type: DataTypes.STRING,
      },

      dni_titular: {
        type: DataTypes.STRING,
      },

      nacionalidad: {
        type: DataTypes.STRING,
      },

      domicilio_real: {
        type: DataTypes.STRING,
      },

      mail: { type: DataTypes.STRING },

      telefono: { type: DataTypes.STRING },

      telefono2: { type: DataTypes.STRING },

      luz: { type: DataTypes.BOOLEAN },

      internet: { type: DataTypes.BOOLEAN },

      gastos_comunes: { type: DataTypes.BOOLEAN },

      is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },

      password: { type: DataTypes.STRING },
    },
    { timestamps: true }
  );
};
