'use strict';

const R = require('ramda');

const seed = {
  sensors: [],
  containers: [
    {
      id: 1,
      label: 'Pilsener',
      minTemperature: 4,
      maxTemperature: 6,
    },
    {
      id: 2,
      label: 'IPA',
      minTemperature: 5,
      maxTemperature: 6,
    },
    {
      id: 3,
      label: 'Lager',
      minTemperature: 4,
      maxTemperature: 7,
    },
    {
      id: 4,
      label: 'Stout',
      minTemperature: 6,
      maxTemperature: 8,
    },
    {
      id: 5,
      label: 'Wheat beer',
      minTemperature: 3,
      maxTemperature: 5,
    },
    {
      id: 6,
      label: 'Pale Ale',
      minTemperature: 4,
      maxTemperature: 6,
    },
  ]
};

module.exports = () => R.clone(seed);
