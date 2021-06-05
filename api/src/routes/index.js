const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs')
const dogsIdRaza = require('./dogsIdRaza')
const postDog = require('./postDog')
const temperament = require('./temperament')
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* [ ] GET /dogs:
Obtener un listado de las primeras 8 razas de perro
Debe devolver solo los datos necesarios para la ruta principal */
/* [ ] GET /dogs?name="...":
Obtener un listado de las primeras 8 razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado */
router.get('/dogs', dogs)

/* [ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados */
router.get('/dogs/:idRaza', dogsIdRaza)

/* [ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí */
router.get('/temperament', temperament)

/* [ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
 */
router.post('/dog', postDog)

module.exports = router;
