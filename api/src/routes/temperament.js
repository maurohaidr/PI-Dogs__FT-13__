const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');


const temperament = function(req, res) {
  const ret = []
  Temperamento.findAll({}).then(temperamentos =>{
  temperamentos.forEach(e => {
      ret.push(e.nombre)
  })
  res.json(ret)
  })
}
module.exports = temperament