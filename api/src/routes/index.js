const { Router } = require('express');
// Importar todos los routers:

const dogs = require('./dogs')
const dogsIdRaza = require('./dogsIdRaza')
const postDog = require('./postDog')
const temperament = require('./temperament')
const dogNames = require('./dogNames')
const router = Router();


// Configurar los routers:
router.get('/dogs', dogs)

router.get('/dogs/:idRaza', dogsIdRaza)

router.post('/dog', postDog)

router.get('/temperament', temperament)

router.get('/dogNames', dogNames)

module.exports = router;
