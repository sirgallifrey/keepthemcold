'use strict';

const joi = require('joi');
const boom = require('boom');
const repo = require('../repository');
const schema = require('./container');

function validate(attributes) {
  const { error } = joi.validate(attributes, schema);
  if (error) {
    throw boom.boomify(error, { statusCode: 400 });
  }
}

function getAll() {
  return repo.get('containers').value();
}

function create(attributes) {
  validate(attributes);
  try {
    const container = repo.get('containers').insert(attributes).write();
    return container;
  } catch (e) {
    throw boom.conflict();
  }
}

function getById(id) {
  const container = repo.get('containers').getById(id).value();
  if (!container) {
    throw boom.notFound();
  }
  return container;
}

function updateById(id, attributes) {
  getById(id);
  validate(attributes);
  return repo.get('containers').updateById(id, attributes).write();
}

function deleteById(id) {
  getById(id);
  return repo.get('containers').removeById(id).write(); 
}

exports.getAll = getAll;
exports.create = create;
exports.getById = getById;
exports.updateById = updateById;
exports.deleteById = deleteById;
exports.validate = validate;
