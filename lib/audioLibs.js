'use strict';

const sox = require('./sox');
const mpg123 = require('./mpg123');
const cvlc = require('./cvlc');

module.exports = [
  {
    "name": "sox",
    "audioPlayerLibrary": sox,
    "processName": "play"
  },
  {
    "name": "mpg123",
    "audioPlayerLibrary": mpg123,
    "processName": "mpg123"
  },
  {
    "name": "cvlc",
    "audioPlayerLibrary": cvlc,
    "processName": "vlc"
  }
];
