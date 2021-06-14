const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs')
const dogsIdRaza = require('./dogsIdRaza')
const postDog = require('./postDog')
const temperament = require('./temperament')
const dogNames = require('./dogNames')
const router = Router();


// Configurar los routers
router.get('/dogs', dogs)

router.get('/dogs/:idRaza', dogsIdRaza)

router.get('/temperament', temperament)

router.post('/dog', postDog)

router.get('/dogNames', dogNames)

module.exports = router;
