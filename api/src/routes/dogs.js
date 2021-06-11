const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');
const { Op } = require("sequelize");

const dogs = function(req, res) {
    if(req.query.name){
        const name = req.query.name;
        const ret = [];
        axios.get('https://api.thedogapi.com/v1/breeds').then(response =>{
            response.data.forEach(e => {
                if(e.name.toLowerCase().includes(name.toLowerCase())){
                    ret.push({
                        id: e.id,
                        imagen: e.image.url,
                        nombre: e.name,
                        temperamento: e.temperament,
                        peso: e.weight.imperial,
                        altura: e.height.imperial,
                        vida: e.life_span
                    })
                }
            })
            Raza.findAll({ include: Temperamento, where: { nombre:{ [Op.iLike]: `%${name}%`  } } }).then(resultado => {
            resultado.forEach(f => {
                let temperamento = '';
                f.temperamentos.forEach(i =>{
                    temperamento = temperamento.concat(i.nombre + ', ') //junto el array de temperamentos en un string
                })
                temperamento = temperamento.slice(0, temperamento.length-2) //elimino el ultimo ', '
                ret.push({
                    id: f.id + 264,
                    nombre: f.nombre,
                    imagen: f.imagen,
                    temperamento: temperamento,
                    peso: f.peso,
                    altura: f.altura,
                    vida: f.vida
                })
            })
            return res.json(ret)        
            })                              
        })
    .catch(error => res.status(500).json(error))
    }
    else
    axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
        /* if(response.data.length > 8) response.data.splice(8, response.data.length-1) */
        const ret = [];
        response.data.forEach(e => {
            ret.push({
            id: e.id,
            imagen: e.image.url,
            nombre: e.name,
            temperamento: e.temperament,
            peso: e.weight.imperial,
            altura: e.height.imperial,
            vida: e.life_span
            })
        })
        Raza.findAll({ include: Temperamento }).then(resultado => {
            resultado.forEach(f => {
                let temperamento = '';
                f.temperamentos.forEach(i =>{
                    temperamento = temperamento.concat(i.nombre + ', ') 
                })
                temperamento = temperamento.slice(0, temperamento.length-2) 
                ret.push({
                    id: f.id + 264,
                    nombre: f.nombre,
                    imagen: f.imagen,
                    temperamento: temperamento,
                    peso: f.peso,
                    altura: f.altura,
                    vida: f.vida
                })
            })
            return res.json(ret)        
        })
        }
    ).catch(error => res.send(error, 'Algo salio mal'))
}
module.exports = dogs
