'use strict';
module.exports = (sequelize, DataTypes) => {
  const PtSession = sequelize.define('PtSession', {
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    allDay: DataTypes.BOOLEAN
  }, {});
  PtSession.associate = function(models) {
    // associations can be defined here
  };
  return PtSession;
};