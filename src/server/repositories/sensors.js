'use strict';

const joi = require('joi');
const boom = require('boom');
const repo = require('../repository');
const schema = require('./sensor');
const R = require('ramda');

function validate(attributes) {
  const { error } = joi.validate(attributes, schema);
  if (error) {
    throw boom.boomify(error, { statusCode: 400 });
  }
}

function getAll() {
  return repo.get('sensors').value();
}

function getByIdOrEmpty(id) {
  const container = repo.get('sensors').getById(id).value();
  if (!container) {
    return { id };
  }
  return container;
}

function upsert(attributes) {
  const attributesWithDate = R.merge(attributes, { measuredAt: new Date().toISOString() });
  validate(attributesWithDate);
  return repo.get('sensors').upsert(attributesWithDate).write();
}


exports.getAll = getAll;
exports.getByIdOrEmpty = getByIdOrEmpty;
exports.upsert = upsert;
exports.validate = validate;
