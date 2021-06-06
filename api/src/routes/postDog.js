const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');

const postDog = function(req, res) {
    const {nombre, peso, altura, vida, imagen, temperamento} = req.body; 
    axios('http://localhost:3001/dogNames').then(r => { // hago un axios a mi back y me devuelve un listado con solo los nombres de las razas
      if(r.data.includes(nombre)) return res.status(422).send('La raza ya existe')
      else{
        const temps = temperamento.replace(/ /g, "").split(',') 
        temps.forEach(i => {
          Temperamento.findAll({}).then(resultado => {
            const ret = [];
            resultado.forEach(e => {
              ret.push(e.nombre)
            })
            if(!ret.includes(i)) {
              Temperamento.create({nombre: i})
            }
          })      
        })
      Raza.create({nombre:nombre, peso:peso, altura:altura, añosDeVida:vida, imagen:imagen}).then(resultado => {
        temps.forEach(i => {
          Temperamento.findOne({where: {nombre:i}}).then(result =>
            resultado.addTemperamento(result) 
          )
        })
      })    
      return res.send('Raza creada')
      }
    })
    .catch(err => {return res.status(500).json(err)})
    
}


module.exports = postDog