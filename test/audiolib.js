'use strict';

var process = require('child_process');
var sharedunit = require('./sharedunit');
var sharedint = require('./sharedint');

// Audio libraries
var sox = require('../lib/sox.js');

describe('Audio Player Libraries (audiolibint.js)', () => {

  // Kill off all of the running audio processes
  afterEach(() => {
    try {
      process.execSync('pkill -9 play');
    }
    catch(err) {}
  });

  describe('Sox', () => {

    describe('Unit', () => {
      sharedunit.shouldBehaveLikeAnAudioLib(sox);
    });

    describe('Integration', () => {
      sharedint.shouldBehaveLikeAnAudioLib('sox');
    });

  });

});
