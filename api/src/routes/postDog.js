const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');

const postDog = function(req, res) {
    let {nombre, peso, altura, vida, imagen, temperamento} = req.body; 
    axios('http://localhost:3001/dogNames').then(r => {
      if(r.data.includes(nombre)) return res.status(422).send('La raza ya existe')
      else{
        const temps = temperamento.toLowerCase().replace(/ /g, "").split(',')
        axios('http://localhost:3001/temperament').then(resultado => {
          temps.forEach(i => {
            if(!resultado.data.includes(i)) {
              Temperamento.create({nombre: i})
            }
          })
          if(imagen === '') imagen ='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c54673e0-9fa9-408d-8f3e-af6c66b31179/dcjz6zw-0462b457-e292-4734-b8e6-fce402dc9bd9.jpg/v1/fill/w_800,h_800,q_75,strp/spunky___rocko_s_modern_life_by_stuf123_dcjz6zw-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvYzU0NjczZTAtOWZhOS00MDhkLThmM2UtYWY2YzY2YjMxMTc5XC9kY2p6Nnp3LTA0NjJiNDU3LWUyOTItNDczNC1iOGU2LWZjZTQwMmRjOWJkOS5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.87hM-7B9Mbqqug-3K1WQhByQB6dgt2dFLP0Wjm1J0_Q'
          Raza.create({nombre:nombre, peso:peso, altura:altura, vida:vida, imagen:imagen}).then(resultado => {
            temps.forEach(i => {
              Temperamento.findOne({where: {nombre:i}}).then(result =>
                resultado.addTemperamento(result) 
              )
            })
          })
        })    
      return res.send('Raza creada')
      }
    })
    .catch(err => {return res.status(500).json(err)})
    
}

module.exports = postDog