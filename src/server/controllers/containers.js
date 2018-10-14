'use strict';

const containers = require('../repositories/containers');
const sensors = require('../repositories/sensors');
const containerSensorSocket = require('../sockets/container-sensor');
const containersSocket = require('../sockets/containers');
const R = require('ramda');
const joi = require('joi');

function indexAction() {
  return containers.getAll();
}

async function createAction(request, responseToolkit) {
  const container = containers.create(request.payload);
  await request.server.publish(
    containersSocket.getPath(),
    containers.getAll()
  );  
  return responseToolkit.response(container).code(201);
}

function showAction(request) {
  return containers.getById(request.params.id);
}

async function updateAction(request) {
  const updated = containers.updateById(request.params.id, request.payload);
  await request.server.publish(
    containersSocket.getPath(),
    containers.getAll()
  );
  return updated;
}

function deleteAction(request, responseToolkit) {
  containers.deleteById(request.params.id);
  return responseToolkit.response('').code(204);
}

async function sensorAction(request, responseToolkit) {
  const id = parseInt(request.params.id, 10);
  containers.getById(id);
  const attributes = R.merge({ id }, request.payload);
  const sensor = sensors.upsert(attributes);
  await request.server.publish(
    containerSensorSocket.getPath(id),
    sensor
  );
  return responseToolkit.response(sensor).code(201);
}

const sensorActionPayoadSchema = joi.object().keys({
  sensorTemperature: joi.number(),
  temperatureSet: joi.number()
});

exports.indexAction = indexAction;
exports.createAction = createAction;
exports.showAction = showAction;
exports.updateAction = updateAction;
exports.deleteAction = deleteAction;
exports.sensorActionPayoadSchema = sensorActionPayoadSchema;
exports.sensorAction = sensorAction;
