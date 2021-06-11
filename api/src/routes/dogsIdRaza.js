const axios = require("axios").default;
const { Raza } = require('../db');

const dogsIdRaza = function(req, res) {
    let razaId = parseInt(req.params.idRaza)
    
    if(razaId<265){
    axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
        const dog = response.data.filter(e => e.id == razaId)
        const retDog = {
            nombre: dog[0].name,
            altura: dog[0].height.metric,
            peso: dog[0].weight.metric,
            vida: dog[0].life_span,
            temperamento: dog[0].temperament,
            imagen: dog[0].image.url
        }
       return res.json(retDog)
    })
    .catch(err => {return res.status(500).json(err)})
    }else{
        razaId = razaId - 264
        Raza.findByPk(razaId).then(resultado => {
            console.log(resultado)
            if (resultado) {
                const retDog = {
                    nombre: resultado.nombre,
                    altura: resultado.altura,
                    peso: resultado.peso,
                    vida: resultado.vida,
                    temperamento: resultado.temperamento,
                    imagen: resultado.imagen
                }
              res.json(retDog)
            } else {
              return res.status(404).send('No se encontro el id')
            }
        })
        .catch(err => {return res.status(500).json(err)})
    }
}
module.exports = dogsIdRaza

