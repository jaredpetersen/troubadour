'use strict';

const Troubadour = require('../../index.js');
const expect = require('chai').expect;

exports.shouldBehaveLikeAnAudioLib = (audioLib) => {

  describe('Play', () => {

    it('emits a start event when the audio starts playing', (done) => {
      const troubadour = new Troubadour(audioLib);

      troubadour.on('start', () => {
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3');
    });

    it('emits an end event when the audio finishes playing', (done) => {
      const troubadour = new Troubadour(audioLib);

      troubadour.on('end', () => {
        done();
      });

      troubadour.play('test/audio/alarm_clock.mp3');
    });

    it('emits an error event when the audio encounters an error');

  });

  describe('Pause', () => {

    it('emits a pause event when the audio is paused', (done) => {
      const troubadour = new Troubadour(audioLib);

      // Wait until the audio starts to pause it
      troubadour.on('start', () => {
        troubadour.pause();
      });
      troubadour.on('pause', () => {
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', (done) => {
      const troubadour = new Troubadour(audioLib);

      troubadour.on('error', (err) => {
        expect(err.message).to.equal('no audio playback to pause');
        done();
      });

      troubadour.pause();
    });

    it('emits an error event when audio playback is not ongoing');

  });

  describe('Stop', () => {

    it('emits a stop event when the audio is stopped', (done) => {
      const troubadour = new Troubadour(audioLib);

      // Wait until the audio starts to stop it
      troubadour.on('start', () => {
        troubadour.stop();
      });
      troubadour.on('stop', () => {
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', (done) => {
      const troubadour = new Troubadour(audioLib);

      troubadour.on('error', (err) => {
        expect(err.message).to.equal('no audio playback to stop');
        done();
      });

      troubadour.stop();
    });

    it('emits an error event when audio playback is not ongoing');

  });

  describe('Resume', () => {

    it('emits a resume event when the audio is resumed', (done) => {
      const troubadour = new Troubadour(audioLib);

      // Wait until the audio pauses to resume it
      troubadour.on('start', () => {
        troubadour.pause();
      });
      troubadour.on('pause', () => {
        troubadour.resume();
      });
      troubadour.on('resume', () => {
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3');
    });

    it('emits an error event when audio playback has not been started', (done) => {
      const troubadour = new Troubadour(audioLib);

      // Listen for the error event
      troubadour.on('error', (err) => {
        expect(err.message).to.equal('no audio playback to resume');
        done();
      });

      troubadour.resume();
    });

  });
};
