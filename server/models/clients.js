'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define(
    'Clients',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      DOB: DataTypes.DATE,
      phone: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  Clients.associate = function(models) {
    Clients.hasMany(models.PtSession);
    Clients.belongsTo(models.User, { foreignKey: 'trainerid' });
  };
  return Clients;
};
