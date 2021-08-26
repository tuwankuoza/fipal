'use strict';
const fs = require('fs')

module.exports = {
  up:  (queryInterface, Sequelize) => {
   let data = JSON.parse(fs.readFileSync('./data/investment.json', 'utf-8'))
   data.forEach(element => {
    element.createdAt = new Date()
    element.updatedAt = new Date()
   });
   return queryInterface.bulkInsert('Investments', data, {})

  },

  down:  (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Investments', null, {})
  }
};
