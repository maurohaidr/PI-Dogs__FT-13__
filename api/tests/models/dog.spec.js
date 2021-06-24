const { Raza, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Raza model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    it('error sin nombre', function(done) {
      Raza.create({
       imagen: 'Hola',
      })
       .then(() => done('No debería haberse creado'))
       .catch(() => done());
   });
   it('error sin imagen', function(done) {
     Raza.create({
       nombre: 'perro',
     })
     .then(() => done('No deberia haberse creado'))
     .catch(() => done());
   });
  });
});

