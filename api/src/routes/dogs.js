const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');
const { Op } = require("sequelize");

const dogs = function(req, res) {
    if(req.query.name){
        const name = req.query.name;
        axios.get('https://api.thedogapi.com/v1/breeds/search?q='+name).then(response => {
            if(response.data.length > 8) response.data.splice(8, response.data.length-1)           
            const ret = [];            
            let img = '';
            response.data.forEach(e => {
                axios.get('https://api.thedogapi.com/v1/breeds').then(resp =>{
                    const filtrado = resp.data.filter(i => i.image.id === e.reference_image_id)[0]
                    img = filtrado.image.url  //cambio el id por la url de la imagen
                    ret.push({
                       imagen: img,
                       nombre: e.name,
                       temperamento: e.temperament 
                       })
                 }).then(
                    Raza.findAll({ include: Temperamento, where: { nombre:{ [Op.like]: `%${name}%`  } } }).then(resultado => {
                        resultado.forEach(f => {
                            let temperamento = '';
                            f.temperamentos.forEach(i =>{
                                temperamento = temperamento.concat(i.nombre + ', ') //junto el array de temperamentos en un string
                            })
                            temperamento = temperamento.slice(0, temperamento.length-2) //elimino el ultimo ', '
                            ret.push({
                                nombre: f.nombre,
                                imagen: f.imagen,
                                temperamento: temperamento 
                            })
                        })        
                    })
                 ).then(() =>{
                    return res.json(ret)
                })
            })
            
        })
        .catch(error => res.status(500).json(error))
    }
    else
    axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
        if(response.data.length > 8) response.data.splice(8, response.data.length-1)
        const ret = [];
        response.data.forEach(e => ret.push({
            imagen: e.image.url,
            nombre: e.name,
            temperamento: e.temperament
        }))
        return res.json(ret)
        }
    ).catch(error => res.send(error, 'Algo salio mal'))
}
module.exports = dogs
