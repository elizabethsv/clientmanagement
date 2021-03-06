'use strict';
module.exports = (sequelize, DataTypes) => {
  const PtSession = sequelize.define('PtSession', {
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    allDay: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
  }, {});
  PtSession.associate = function(models) {
    PtSession.belongsTo(models.User, {foreignKey: 'trainerid'})
    PtSession.belongsTo(models.Clients, {foreignKey: 'clientid'})
  };
  return PtSession;
};