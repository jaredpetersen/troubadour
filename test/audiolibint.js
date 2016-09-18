'use strict';

var process = require('child_process');
var shared = require('./shared');

describe('Audio Player Library Integration (audiolibint.js)', function() {

  afterEach(function() {
    try {
      process.execSync('pkill -9 play');
    }
    catch(err) {}
  });

  describe('Sox', function() {
    shared.shouldBehaveLikeAnAudioLib('sox');
  });

});
