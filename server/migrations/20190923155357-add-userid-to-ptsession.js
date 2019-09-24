'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    //Client has many sessions
    return queryInterface.addColumn(
      'PtSessions',
      'clientid',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'PtSessions',
      'clientid'
    )
  }
};
