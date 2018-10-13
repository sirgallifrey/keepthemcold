'use strict';

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

function createAction(request) {
  return containers.create(request.payload);
}

function showAction(request) {
  return containers.getById(request.params.id);
}

function updateAction(request) {
  return containers.updateById(request.params.id, request.payload);
}

function deleteAction(request) {
  return containers.deleteById(request.params.id);
}

exports.register = register;
