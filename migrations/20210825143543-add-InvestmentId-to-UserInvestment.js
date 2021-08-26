'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
     return queryInterface.addColumn(
      'UserInvestments',
      'InvestmentId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Investments'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )
  },

  down:  (queryInterface, Sequelize) => {
     return queryInterface.removeColumn(
      'UserInvestments',
      'InvestmentId',
      {}
    )
  }
};
