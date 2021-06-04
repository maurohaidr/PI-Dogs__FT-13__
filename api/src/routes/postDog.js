const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');

const postDog = function(req, res) {
    const {nombre, peso, altura, vida, temperamento} = req.body; //enviarlos con esos nombres desde el formulario
    Raza.create({nombre:nombre, peso:peso, altura:altura, añosDeVida:vida})
    temperamento.forEach(e => Temperamento.create({nombre: e})) //temperamento es un array de temperamentos, ver eso en el formulario
}
module.exports = postDog