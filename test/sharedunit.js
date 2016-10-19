'use strict';

const expect = require('chai').expect;
const process = require('child_process');
const EventEmitter = require('events').EventEmitter;

exports.shouldBehaveLikeAnAudioLib = (audioLib) => {

  describe('Play', () => {

    it('emits a start event when the audio starts playing', (done) => {
      const eventEmitter = new EventEmitter();

      eventEmitter.on('start', () => {
        done();
      });

      audioLib.play(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an end event when the audio finishes playing', (done) => {
      const eventEmitter = new EventEmitter();

      eventEmitter.on('end', () => {
        done();
      });

      audioLib.play(eventEmitter, 'test/audio/alarm_clock.mp3');
    });

    it('throws an error when an EventEmitter is not passed to it', (done) => {
      try {
        audioLib.play('test/audio/splashing_around.mp3');
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)')
        done();
      }
    });

    it('throws an error when a filepath is not passed to it', (done) => {
      const eventEmitter = new EventEmitter();

      try {
        audioLib.play(eventEmitter);
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)');
        done();
      }
    });

    it('throws an error when parameters are not passed', (done) => {
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

  describe('Pause', () => {

    it('emits a pause event when the audio is paused', (done) => {
      const eventEmitter = new EventEmitter();

      // Wait until the audio starts to pause it
      eventEmitter.on('start', () => {
        audioLib.pause(eventEmitter);
      });
      eventEmitter.on('pause', () => {
        done();
      });

      audioLib.play(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', (done) => {
      const eventEmitter = new EventEmitter();

      eventEmitter.on('error', (err) => {
        expect(err.message).to.equal('no audio playback to pause');
        done();
      });

      audioLib.pause(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an error when audio playback is not ongoing');

    it('throws an error when an EventEmitter is not passed to it', (done) => {
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

  describe('Stop', () => {

    it('emits a stop event when the audio playback has been stopped', (done) => {
      const eventEmitter = new EventEmitter();

      // Wait until the audio starts to stop it
      eventEmitter.on('start', () => {
        audioLib.stop(eventEmitter);
      });
      eventEmitter.on('stop', () => {
        done();
      });

      audioLib.play(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', (done) => {
      const eventEmitter = new EventEmitter();

      eventEmitter.on('error', (err) => {
        expect(err.message).to.equal('no audio playback to stop');
        done();
      });

      audioLib.stop(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an error when audio playback is not ongoing');

    it('throws an error when an EventEmitter is not passed to it', (done) => {
      try {
        audioLib.stop();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter');
        done();
      }
    });

  });

  describe('Resume', () => {

    it('emits a resume event when the audio playback has been resumed', (done) => {
      const eventEmitter = new EventEmitter();

      // Wait until the audio is paused to start it
      eventEmitter.on('start', () => {
        audioLib.pause(eventEmitter);
      });
      eventEmitter.on('pause', () => {
        audioLib.resume(eventEmitter);
      });
      eventEmitter.on('resume', () => {
        done();
      });

      audioLib.play(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', (done) => {
      const eventEmitter = new EventEmitter();

      eventEmitter.on('error', (err) => {
        expect(err.message).to.equal('no audio playback to resume');
        done();
      });

      audioLib.resume(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an error event when an EventEmitter is not passed to it', (done) => {
      try {
        audioLib.resume();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter');
        done();
      }
    });

  });

};
