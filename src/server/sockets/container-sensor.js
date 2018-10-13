'use strict';

const sensors = require('../repositories/sensors');

function getPath(id) {
  if (id) {
    return `/containers/${id}/sensors`;
  }
  return '/containers/{id}/sensors';
}

async function onSubscribe(socket, path, params) {
  await socket.publish(path, sensors.getByIdOrEmpty(params.id));
}

exports.getPath = getPath;
exports.onSubscribe = onSubscribe;
