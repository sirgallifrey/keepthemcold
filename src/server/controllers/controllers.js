'use strict';

const containers = require('./containers');

function register(server) {
  server.route([
    {
      path: '/containers',
      method: 'get',
      handler: containers.indexAction
    },
    {
      path: '/containers',
      method: 'post',
      handler: containers.createAction
    },
    {
      path: '/containers/{id}',
      method: 'get',
      handler: containers.showAction
    },
    {
      path: '/containers/{id}',
      method: 'put',
      handler: containers.updateAction
    },
    {
      path: '/containers/{id}',
      method: 'delete',
      handler: containers.deleteAction
    },
    {
      path: '/containers/{id}/sensors',
      method: 'post',
      handler: containers.sensorAction,
    },
  ]);
}

exports.register = register;
