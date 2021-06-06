const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');


const temperament = function(req, res) {
  const ret = []
  Temperamento.findAll({}).then(result =>{
  result.forEach(e => {
      ret.push(e.nombre)
  })
  return res.json(ret)
  })
  .catch(err => {return res.status(500).json(err)})
}
module.exports = temperament