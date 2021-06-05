const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');
const { Op } = require("sequelize");

const dogs = function(req, res) {
    if(req.query.name){
        const name = req.query.name;
        const img = [];
        axios.get('https://api.thedogapi.com/v1/breeds/search?q='+name).then(response => {
            if(response.data.length > 8) response.data.splice(8, response.data.length-1)    
         
            const ret = [];            
            let img = '';
            response.data.forEach(e => {
                axios.get('https://api.thedogapi.com/v1/breeds').then(resp =>{
                    const filtrado = resp.data.filter(i => i.image.id === e.reference_image_id)[0]
                    img = filtrado.image.url  
                    console.log(img)   
                    ret.push({
                        //no devuelvo la imagen sino su id
                       imagen: img,
                       nombre: e.name,
                       temperamento: e.temperament //ver temperamento, modelo aparte
                       })
                 }).then(
                    Raza.findAll({ where: { nombre:{ [Op.like]: '%'+name+'%' }  }} && { include: Temperamento }).then(resultado => {
                        resultado.forEach(e => {
                            let temperamento = '';
                            e.temperamentos.forEach(i =>{
                                temperamento = temperamento.concat(i.nombre + ', ')
                            })
                            ret.push({
                                nombre: e.nombre,
                                imagen: e.imagen,
                                temperamento: temperamento //ver temperamento, modelo aparte
                            })
                        })
        
                    })
                 ).then(() =>{
                    return res.json(ret)
                })
                /* console.log(filtrado.image.url) */
              /*   ret.push({
                 //no devuelvo la imagen sino su id
                imagen: img,
                nombre: e.name,
                temperamento: e.temperament //ver temperamento, modelo aparte
                }) */
            })
            
        })
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
    ).catch(error => res.send(error, 'Raza no encontrada'))
}
module.exports = dogs
