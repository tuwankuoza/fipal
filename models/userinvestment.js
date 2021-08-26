'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInvestment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInvestment.belongsTo(models.User, {foreignKey: "UserId"})
      UserInvestment.belongsTo(models.Investment, {foreignKey: "InvestmentId"})
    }
  };
  UserInvestment.init({
    period: DataTypes.INTEGER,
    recommendation: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserInvestment',
  });
  return UserInvestment;
};