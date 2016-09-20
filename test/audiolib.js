'use strict';

var process = require('child_process');
var sharedunit = require('./sharedunit');
var sharedint = require('./sharedint');

describe('Audio Player Libraries (audiolibint.js)', function() {

  // Kill off all of the running audio processes
  afterEach(function() {
    try {
      process.execSync('pkill -9 play');
    }
    catch(err) {}
  });

  describe('Sox', function() {

    describe('Unit', function() {
      sharedunit.shouldBehaveLikeAnAudioLib(require('../lib/sox.js'));
    });

    describe('Integration', function() {
      sharedint.shouldBehaveLikeAnAudioLib('sox');
    });

  });

});
