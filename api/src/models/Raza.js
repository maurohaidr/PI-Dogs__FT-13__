const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('raza', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    añosDeVida: {
      type: DataTypes.STRING,
    },
    imagen:{
      type: DataTypes.STRING,
    }
  });
};
