'use strict';

var Jukebox = require('../index.js');

exports.shouldBehaveLikeAnAudioLib = function(audioLib) {

  describe('Play', function() {

    it('emits a start event when the audio starts playing', function(done) {
      var jukebox = new Jukebox(audioLib);
      jukebox.on('start', function() {
        done();
      });
      jukebox.play('test/audio/splashing_around.mp3');
    });

    it('emits an end event when the audio finishes playing', function(done) {
      var jukebox = new Jukebox(audioLib);
      jukebox.on('end', function() {
        done();
      });
      jukebox.play();
    });

  });

};
