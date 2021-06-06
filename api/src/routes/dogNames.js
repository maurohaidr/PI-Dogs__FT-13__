const axios = require("axios").default;
const { Raza } = require('../db');


const dogNames = function(req, res) {
  const names = [];
  Raza.findAll({attributes: ["nombre"]}).then(resultado =>{
  resultado.forEach(e => {
      names.push(e.nombre)
  })
  axios('https://api.thedogapi.com/v1/breeds').then(resul =>{
      resul.data.forEach(i => {
          names.push(i.name)
      })
      res.json(names)
  })
 
  })
}
module.exports = dogNames