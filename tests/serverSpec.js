var chai = require('chai');
var mocha = require('mocha');
var assert = chai.assert;
var expect = chai.expect;
var app = require('../server/app-config.js');
var supertest = require('supertest');
// var Session = require('supertest-session')({app: app});
var port = app.get('port');

after(function() {
  'use strict';
  app.get('db').destroy();
});

describe('Server Unit Tests', function() {
  'use strict';

  it('server port should be a number', function(){
    expect(port).to.be.a('number');
    assert.typeOf(port, 'number');
  });

  describe('GET /', function(){
    it('respond with plain text and 200 status code', function(done){
      supertest(app)
        .get('/')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('ETag', '12345')
        .expect(200)
        .expect('Hello Alan!', done);
    });
  });

  describe('GET /mementos', function(){
    it('respond with 200 status code', function(done){
      supertest(app)
        .get('/api/1/mementos')
        .expect(200, done);
    });
  });

  describe('POST /mementos', function(){
    it('respond with 201 status code', function(done){
      supertest(app)
        .post('/api/1/mementos')
        .expect(201, done);
    });
  });

  describe('GET /mementos/:id', function(){
    it('respond with 200 status code', function(done){
      supertest(app)
        .get('/api/1/mementos/:id')
        .expect(200, done);
    });
  });

  describe('PUT /mementos/:id', function(){
    it('respond with 201 status code', function(done){
      supertest(app)
        .put('/api/1/mementos/:id')
        .expect(201, done);
    });
  });

  describe('POST /moments', function(){
    it('respond with 201 status code', function(done){
      supertest(app)
        .post('/api/1/moments')
        .expect(201, done);
    });
  });

  describe('GET /auth/signup', function(){
    it('respond with 200 status code', function(done){
      supertest(app)
        .get('/auth/signup')
        .expect(200, done);
    });
  });

  describe('POST /auth/signup', function(){
    xit('respond with 201 status code', function(done){
      supertest(app)
        .post('/auth/signup')
        .expect(201, done);
    });
  });

  describe('GET /auth/login', function(){
    it('respond with 200 status code', function(done){
      supertest(app)
        .get('/auth/login')
        .expect(200, done);
    });
  });

  describe('POST /auth/login', function(){
    xit('respond with 201 status code', function(done){
      supertest(app)
        .post('/auth/login')
        .expect(201, done);
    });
  });

  describe('GET /auth/logout', function(){
    it('respond with 302 redirect status code', function(done){
      supertest(app)
        .get('/auth/logout')
        .expect(302, done);
    });
  });

  describe('Redis Sessions', function(){
    it('res.cookies should contain a sessionID', function(done){
      supertest(app)
        .get('/')
        .expect('Set-Cookie', /sessionID/ , done);
    });

    it('res.cookies should contain a connect.sid', function(done){
      supertest(app)
        .get('/')
        .expect('Set-Cookie', /connect.sid/ , done);
    });
  });

  after(function() {
    app.get('redis').redisOptions.client.quit();
  });

});
