'use strict';

var expect = require('chai').expect;
var process = require('child_process');
var EventEmitter = require('events').EventEmitter;

exports.shouldBehaveLikeAnAudioLib = function(audioLib) {

  describe('Play', function() {

    it('emits a start event when the audio starts playing', function(done) {
      var eventEmitter = new EventEmitter();
      eventEmitter.on('start', function() {
        done();
      });
      audioLib.play(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an end event when the audio finishes playing', function(done) {
      this.timeout(10000);
      var eventEmitter = new EventEmitter();
      eventEmitter.on('end', function() {
        done();
      });
      audioLib.play(eventEmitter, 'test/audio/alarm_clock.mp3');
    });

    it('throws an error when an EventEmitter is not passed to it', function(done) {
      try {
        audioLib.play('test/audio/splashing_around.mp3');
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)')
        done();
      }
    });

    it('throws an error when a filepath is not passed to it', function(done) {
      var eventEmitter = new EventEmitter();
      try {
        audioLib.play(eventEmitter);
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)');
        done();
      }
    });

    it('throws an error when parameters are not passed', function(done) {
      try {
        audioLib.play();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)')
        done();
      }
    });

  });

  describe('Pause', function() {

    it('emits a pause event when the audio is paused', function(done) {
      var eventEmitter = new EventEmitter();

      // Wait until the music starts to pause it
      eventEmitter.on('start', function() {
        audioLib.pause(eventEmitter);
      });

      eventEmitter.on('pause', function() {
        done();
      });

      audioLib.play(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', function(done) {
      var eventEmitter = new EventEmitter();
      eventEmitter.on('error', function(message) {
        expect(message).to.equal('no audio playback to pause');
        done();
      });
      audioLib.pause(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('throws an error when an EventEmitter is not passed to it', function(done) {
      try {
        audioLib.pause();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter');
        done();
      }
    });

  });

};
