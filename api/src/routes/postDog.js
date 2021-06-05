const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');

const postDog = function(req, res) {
    const {nombre, peso, altura, vida, imagen, temperamento} = req.body; //enviarlos con esos nombres desde el formulario
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
    res.send('Raza creada')
}


module.exports = postDog