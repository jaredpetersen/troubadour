'use strict';

var Troubadour = require('../index.js');
var expect = require('chai').expect;

exports.shouldBehaveLikeAnAudioLib = function(audioLib) {

  describe('Play', function() {

    it('emits a start event when the audio starts playing', function(done) {
      var troubadour = new Troubadour(audioLib);

      troubadour.on('start', function() {
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3');
    });

    it('emits an end event when the audio finishes playing', function(done) {
      var troubadour = new Troubadour(audioLib);

      troubadour.on('end', function() {
        done();
      });

      troubadour.play('test/audio/alarm_clock.mp3');
    });

  });

  describe('Pause', function() {

    it('emits a pause event when the audio is paused', function(done) {
      var troubadour = new Troubadour(audioLib);

      // Wait until the audio starts to pause it
      troubadour.on('start', function() {
        troubadour.pause();
      });
      troubadour.on('pause', function() {
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', function(done) {
      var troubadour = new Troubadour(audioLib);

      troubadour.on('error', function(err) {
        expect(err.message).to.equal('no audio playback to pause');
        done();
      });

      troubadour.pause();
    });

    it('emits an error event when audio playback is not ongoing');

  });

  describe('Stop', function() {

    it('emits a stop event when the audio is stopped', function(done) {
      var troubadour = new Troubadour(audioLib);

      // Wait until the audio starts to stop it
      troubadour.on('start', function() {
        troubadour.stop();
      });
      troubadour.on('stop', function() {
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', function(done) {
      var troubadour = new Troubadour(audioLib);

      troubadour.on('error', function(err) {
        expect(err.message).to.equal('no audio playback to stop');
        done();
      });

      troubadour.stop();
    });

    it('emits an error event when audio playback is not ongoing');

  });


  describe('Resume', function() {

    it('emits a resume event when the audio is resumed', function(done) {
      var troubadour = new Troubadour(audioLib);

      // Wait until the audio pauses to resume it
      troubadour.on('start', function() {
        troubadour.pause();
      });
      troubadour.on('pause', function() {
        troubadour.resume();
      });
      troubadour.on('resume', function() {
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', function(done) {
      var troubadour = new Troubadour(audioLib);

      // Listen for the error event
      troubadour.on('error', function(err) {
        expect(err.message).to.equal('no audio playback to resume');
        done();
      });

      troubadour.resume();
    });

  });
};
