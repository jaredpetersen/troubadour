'use strict';

const sox = require('./sox');
const mpg123 = require('./mpg123');

module.exports = [
  {
    "name": "sox",
    "audioPlayerLibrary": sox,
    "command": "play"
  },
  {
    "name": "mpg123",
    "audioPlayerLibrary": mpg123,
    "command": "mpg123"
  }
];
