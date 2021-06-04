const axios = require("axios").default;

const dogsIdRaza = function(req, res) {
    const razaId = req.params.idRaza;
    axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
        const dog = response.data.filter(e => e.id == razaId)
        retDog = {
            nombre: dog[0].name,
            altura: dog[0].height.metric,
            peso: dog[0].weight.metric,
            añosDeVida: dog[0].life_span,
            temperamento: dog[0].temperament,
            imagen: dog[0].image.url
        }
       res.json(retDog)
    })
}
module.exports = dogsIdRaza

/* (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida */ 