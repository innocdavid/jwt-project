// modules
const express = require('express');
const request = require('supertest');
const app = require('../app')

describe('GET / ', () => {
  it('respond with a 200 status code', async () => {
    await request(app)
      .get('/')
      .expect('Content-Length', '22')
      .expect('Content-Type', /html/)
      .expect(200);
  }); 
});




