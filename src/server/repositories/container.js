'use strict';

const joi = require('joi');

const schema = joi.object().keys({
  id: joi.number().integer().required(),
  label: joi.string().required(),
  minTemperature: joi.number().required(),
  maxTemperature: joi.number().required(),
});

module.exports = schema;
