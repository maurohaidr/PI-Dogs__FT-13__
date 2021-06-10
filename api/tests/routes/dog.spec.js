/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);

describe('GET /', function () {
  it('responde con 200', function() {
    return agent.get('/dogs')
    .expect(200);
  });
  it('espera que sea json', function(){
    return agent.get('/dogs')
      .expect('Content-Type', /json/);
  });
});
