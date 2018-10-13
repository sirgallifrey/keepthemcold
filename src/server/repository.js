'use strict';

const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');
const lodashId = require('lodash-id');
const seed = require('./config/seed');

const repo = low(new Memory());
repo._.mixin(lodashId);

repo.defaults(seed())
  .write()

module.exports = repo;
