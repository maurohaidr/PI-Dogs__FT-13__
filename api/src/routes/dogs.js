const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');
const { Op } = require("sequelize");

const dogs = function(req, res) {
    if(req.query.name){
        const name = req.query.name;
        const ret = [];
        axios.get('https://api.thedogapi.com/v1/breeds/search?q='+name).then(response => {                         
            let img = '';
            axios.get('https://api.thedogapi.com/v1/breeds').then(resp =>{
                response.data.forEach(e => {                
                    let filtrado = {weight:{imperial:'0 - 0'} , image:{ url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c54673e0-9fa9-408d-8f3e-af6c66b31179/dcjz6zw-0462b457-e292-4734-b8e6-fce402dc9bd9.jpg/v1/fill/w_800,h_800,q_75,strp/spunky___rocko_s_modern_life_by_stuf123_dcjz6zw-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvYzU0NjczZTAtOWZhOS00MDhkLThmM2UtYWY2YzY2YjMxMTc5XC9kY2p6Nnp3LTA0NjJiNDU3LWUyOTItNDczNC1iOGU2LWZjZTQwMmRjOWJkOS5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.87hM-7B9Mbqqug-3K1WQhByQB6dgt2dFLP0Wjm1J0_Q'}}
                    if(e.reference_image_id) filtrado = resp.data.filter(i => i.image.id === e.reference_image_id)[0]
                    peso = filtrado.weight.imperial
                    if(peso === 'NaN') peso = 'No Info'
                    img = filtrado.image.url  //cambio el id por la url de la imagen, si no existe le asigno una por default
                    ret.push({
                       id: e.id,
                       imagen: img,
                       nombre: e.name,
                       temperamento: e.temperament,
                       peso: peso,
                       altura: e.height.imperial,
                       vida: e.life_span
                       })
                 })
                 Raza.findAll({ include: Temperamento, where: { nombre:{ [Op.like]: `%${name}%`  } } }).then(resultado => {
                    resultado.forEach(f => {
                        let temperamento = '';
                        f.temperamentos.forEach(i =>{
                            temperamento = temperamento.concat(i.nombre + ', ') //junto el array de temperamentos en un string
                        })
                        temperamento = temperamento.slice(0, temperamento.length-2) //elimino el ultimo ', '
                        ret.push({
                            id: f.id,
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
        return res.json(ret)
        }
    ).catch(error => res.send(error, 'Algo salio mal'))
}
module.exports = dogs
