'use strict';

const containers = require('../repositories/containers');

function getPath() {
  return '/containers';
}

async function onSubscribe(socket, path, params) {
  await socket.publish(path, containers.getAll());
}

exports.getPath = getPath;
exports.onSubscribe = onSubscribe;
