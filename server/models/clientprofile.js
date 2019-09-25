'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClientProfile = sequelize.define('ClientProfile', {
    goal: DataTypes.STRING,
    age: DataTypes.INTEGER,
    bmi: DataTypes.DECIMAL,
    bmi: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    height: DataTypes.DECIMAL,
    note: DataTypes.TEXT
  }, {});
  ClientProfile.associate = function(models) {
    // associations can be defined here
  };
  return ClientProfile;
};