'use strict';

const joi = require('joi');

const schema = joi.object().keys({
  id: joi.number().integer().required(),
  sensorTemperature: joi.number(),
  temperatureSet: joi.number(),
  measuredAt: joi.string().isoDate().required(),
});

module.exports = schema;
