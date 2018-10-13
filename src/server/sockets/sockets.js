'use strict';

const containers = require('./containers');
const containerSensor = require('./container-sensor');

function register(server) {
  server.subscription(containers.getPath(), {
    onSubscribe: containers.onSubscribe
  });
  server.subscription(containerSensor.getPath(), {
    onSubscribe: containerSensor.onSubscribe
  });
}

exports.register = register;
