'use strict';

const process = require('child_process');
const supportedAudioPlayers = require('../lib/supportedAudioPlayers');
const sharedunit = require('./unit/audioLibUnit');
const sharedint = require('./integration/audioLibInt');

// Run integration and unit tests for each audio player
supportedAudioPlayers.forEach((player) => {

  describe(player.name, () => {

    // Kill off all of the running audio processes
    afterEach(() => {
      try {
        process.execSync('pkill -9 ' + player.processName);
      }
      catch(err) {}
    });

    describe('Unit', () => {
      sharedunit.shouldBehaveLikeAnAudioPlayer(player);
    });

    describe('Integration', () => {
      sharedint.shouldBehaveLikeAnAudioPlayer(player.name);
    });

  });

});
