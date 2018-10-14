const seed = require('../../../src/server/config/seed');
const repository = require('../../../src/server/repository');

module.exports = () => {
  repository.setState(seed());
};
