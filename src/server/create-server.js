'use strict';
const hapi = require('hapi');
const nes = require('nes');
const containers = require('./controllers/containers');

async function createServer() {
  const server = new hapi.Server({ port: 9090 });
  await server.register(nes);
  containers.register(server);
  return server;
}

module.exports = createServer;
