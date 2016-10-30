'use strict';

const process = require('child_process');
const sharedunit = require('./unit/audiolibunit');
const sharedint = require('./integration/audiolibint');

// Audio libraries
const sox = require('../lib/sox.js');

describe('Audio Player Libraries', () => {

  describe('Sox', () => {

    // Kill off all of the running audio processes
    afterEach(() => {
      try {
        process.execSync('pkill -9 play');
      }
      catch(err) {}
    });

    /*describe('Unit', () => {
      sharedunit.shouldBehaveLikeAnAudioLib(sox);
    });*/

    describe('Integration', () => {
      sharedint.shouldBehaveLikeAnAudioLib('sox');
    });

  });

});
