'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Investment, {through: 'UserInvestment', foreignKey: "UserId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password tidak boleh kosong'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Nama tidak boleh kosong'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Age tidak boleh kosong'
        }
      }
    },
    profession: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Profession tidak boleh kosong'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'City tidak boleh kosong'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Nomor telepon tidak boleh kosong'
        }
      }
    },
    income: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Pendapatan tidak boleh kosong'
        }
      }
    },
    expense: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Pengeluaran tidak boleh kosong'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};