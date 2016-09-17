'use strict';

var shared = require('./shared');

describe('Audio Player Library Integration (audiolibint.js)', function() {

  describe('Sox', function() {
    shared.shouldBehaveLikeAnAudioLib('sox');
  });

});
