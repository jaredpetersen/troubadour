'use strict';

var Jukebox = require('../index.js');
var expect = require('chai').expect;

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
      this.timeout(10000);
      var jukebox = new Jukebox(audioLib);
      jukebox.on('end', function() {
        done();
      });
      jukebox.play('test/audio/alarm_clock.mp3');
    });

  });

  describe('Pause', function() {

    it('emits a pause event when the audio is paused', function(done) {
      var jukebox = new Jukebox(audioLib);

      // Wait until the music starts to pause it
      jukebox.on('start', function() {
        jukebox.pause();
      });

      jukebox.on('pause', function() {
        done();
      });

      jukebox.play('test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', function(done) {
      var jukebox = new Jukebox(audioLib);

      // Listen for the error event
      jukebox.on('error', function(err) {
        expect(err.message).to.equal('no audio playback to pause');
        done();
      });

      jukebox.pause();
    });

    it('emits an error event when audio playback is not ongoing');

  });

  describe('Stop', function() {

    it('emits a stop event when the audio is stopped', function(done) {
      var jukebox = new Jukebox(audioLib);

      // Wait until the music starts to stop it
      jukebox.on('start', function() {
        jukebox.stop();
      });

      jukebox.on('stop', function() {
        done();
      });

      jukebox.play('test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', function(done) {
      var jukebox = new Jukebox(audioLib);

      // Listen for the error event
      jukebox.on('error', function(err) {
        expect(err.message).to.equal('no audio playback to stop');
        done();
      });

      jukebox.stop();
    });

    it('emits an error event when audio playback is not ongoing');

  });

};
