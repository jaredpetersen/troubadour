'use strict';

const process = require('child_process');
const rewire = require('rewire');
const sharedunit = require('./unit/audioLibUnit');
const sharedint = require('./integration/audioLibInt');

// Audio libraries
const sox = rewire('../lib/sox.js');

describe('Sox', () => {

  // Kill off all of the running audio processes
  afterEach(() => {
    try {
      process.execSync('pkill -9 play');
    }
    catch(err) {}
  });

  describe('Unit', () => {
    sharedunit.shouldBehaveLikeAnAudioLib(sox);
  });

  describe('Integration', () => {
    sharedint.shouldBehaveLikeAnAudioLib('sox');
  });

});
