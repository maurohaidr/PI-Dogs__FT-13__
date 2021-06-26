require('dotenv').config();
const axios = require("axios").default;
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

/* const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
}); */ 
const sequelize = new Sequelize(`postgres://oaozniryxkbkjz:c82f8e2321438789486b6cc02a4173465d5a6e931779754d37b5049a78ea23f5@ec2-34-195-143-54.compute-1.amazonaws.com:5432/d7si8g79sbm47t`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialect: "postgres",
    ssl: true,
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Raza, Temperamento } = sequelize.models;


    /* axios.get('https://api.thedogapi.com/v1/breeds').then(resultado =>{ //cargo los temperamentos de la api en mi base de datos
      let temps = [];
      let unicos = [];
      resultado.data.forEach(e => {
        if(e.temperament){        
        temps = e.temperament.replace(/ /g, "").split(',') // elimino los espacios en el string y lo conviero a un array de temperamentos 
        temps.forEach(i => {
          if(!unicos.includes(i)) unicos.push(i)
        })}
      })
      unicos.forEach(e => Temperamento.create({nombre: e.toLowerCase()}))
  })
  .then(console.log('Base de datos cargada'))
  .catch(error => console.log('Error al cargar la base de datos', error)) */



// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Raza.belongsToMany(Temperamento, {through: 'temp-raza'})
Temperamento.belongsToMany(Raza, {through: 'temp-raza'})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
