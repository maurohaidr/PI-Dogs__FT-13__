const axios = require("axios").default;
const { Raza } = require('../db');


const dogs = function(req, res) {
    if(req.query.name){
        const name = req.query.name;
        axios.get('https://api.thedogapi.com/v1/breeds/search?q='+name).then(response => {
            if(response.data.length > 8) response.data.splice(8, response.data.length-1)
            const ret = [];
            response.data.forEach(e => ret.push({
                imagen: e.reference_image_id, //no devuelvo la imagen sino su id
                nombre: e.name,
                temperamento: e.temperament
            }))
            ret.push(Raza.findAll({ where: { nombre: name }} )) //ver temperamento, modelo aparte
            return res.json(ret)
        })
    }
    else{
    axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
        if(response.data.length > 8) response.data.splice(8, response.data.length-1)
        const ret = [];
        response.data.forEach(e => ret.push({
            imagen: e.image.url,
            nombre: e.name,
            temperamento: e.temperament
        }))
        return ret
        }
    )}
}
module.exports = dogs
