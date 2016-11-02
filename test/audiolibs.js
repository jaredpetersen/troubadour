'use strict';

const process = require('child_process');
const audioLibs = require('../lib/audioLibs');
const sharedunit = require('./unit/audioLibUnit');
const sharedint = require('./integration/audioLibInt');

// Audio libraries
audioLibs.forEach((lib) => {

  describe(lib.name, () => {

    // Kill off all of the running audio processes
    afterEach(() => {
      try {
        process.execSync('pkill -9 ' + lib.command);
      }
      catch(err) {}
    });

    describe('Unit', () => {
      sharedunit.shouldBehaveLikeAnAudioLib(lib.audioPlayerLibrary);
    });

    describe('Integration', () => {
      sharedint.shouldBehaveLikeAnAudioLib(lib.name);
    });

  });

});
