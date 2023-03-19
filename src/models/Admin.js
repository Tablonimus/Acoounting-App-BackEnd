const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      user: { type: DataTypes.STRING },

      password: { type: DataTypes.STRING },
    },
    { timestamps: true }
  );
};
