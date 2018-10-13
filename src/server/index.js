'use strict';
const createServer = require('./create-server');

async function start() {
  const server = await createServer();
  await server.start();
}

start();