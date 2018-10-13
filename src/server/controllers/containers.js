'use strict';

const boom = require('boom');
const containers = require('../repositories/containers');

function register(server) {
  server.route([
    {path: '/containers', method: 'get', handler: indexAction },
    {path: '/containers', method: 'post', handler: createAction },
    {path: '/containers/{id}', method: 'get', handler: showAction },
    {path: '/containers/{id}', method: 'put', handler: updateAction },
    {path: '/containers/{id}', method: 'delete', handler: deleteAction },
  ]);

  server.subscription('/containers');
  server.subscription('/containers/{id}');  
}

function indexAction() {
  return containers.getAll();
}

function createAction(request, responseToolkit) {
  const container = containers.create(request.payload);
  return responseToolkit.response(container).code(201);
}

function showAction(request) {
  return containers.getById(request.params.id);
}

function updateAction(request) {
  return containers.updateById(request.params.id, request.payload);
}

function deleteAction(request, responseToolkit) {
  containers.deleteById(request.params.id);
  return responseToolkit.response("").code(204);
}

exports.register = register;
