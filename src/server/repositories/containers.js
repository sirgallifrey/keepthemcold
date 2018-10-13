'use strict';

const repo = require('../repository');

function getAll() {
  return repo.get('containers').value();
}

function create({ label, minTemperature, maxTemperature, }) {
  return repo.get('containers').insert({
    label,
    minTemperature,
    maxTemperature,
  }).write();
}

function getById(id) {
  return repo.get('containers').getById(id).value();
}

function updateById(id, attrs) {
  return repo.get('containers').updateById(id).write().value();
}

function deleteById(id) {
  return repo.get('containers').removeById(id).write().value(); 
}

exports.getAll = getAll;
exports.create = create;
exports.getById = getById;
exports.updateById = updateById;
exports.deleteById = deleteById;
