'use strict';
const hapi = require('hapi');
const nes = require('nes');
const controllers = require('./controllers/controllers');
const sockets = require('./sockets/sockets');

async function createServer() {
  const server = new hapi.Server({ port: 9090 });
  await server.register(nes);

  controllers.register(server);
  sockets.register(server);

  return server;
}

module.exports = createServer;
