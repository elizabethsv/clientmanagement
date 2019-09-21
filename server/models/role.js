'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    description: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.belongsToMany(models.User, {through: 'UserRole',foreignKey: 'Users_id_seq', as: 'userid'})
  };
  return Role;
};