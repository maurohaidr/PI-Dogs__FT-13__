const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('temperamento', {
    nombre: {
      type: DataTypes.STRING,
    }
  })
}
