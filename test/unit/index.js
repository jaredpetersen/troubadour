'use strict';

const expect = require('chai').expect;
const Troubadour = require('../../index.js');

describe('Index (Unit)', () => {

  describe('Constructor', () => {

    it('throws an error when it is not passed the name of a audio player library', (done) => {
      try {
        const troubadour = new Troubadour();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('audio player not specified');
        done();
      }
    });

    it('throws an error when it is passsed the name of a non-supported audio player library', (done) => {
      try {
        const troubadour = new Troubadour('pikachu');
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('audio player not supported');
        done();
      }
    });

  });

  describe('Play', () => {

    it('emits an error when it is not passed a filepath', (done) => {
      const troubadour = new Troubadour('sox');

      troubadour.on('error', (err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('filepath not specified');
        done();
      });

      troubadour.play();
    });

    it('emits an error when another command is injected (;)', (done) => {
      const troubadour = new Troubadour('sox');

      troubadour.on('error', (err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('emits an error when another command is injected (&&)', (done) => {
      const troubadour = new Troubadour('sox');

      troubadour.on('error', (err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('emits an error when another command is injected (||)', (done) => {
      const troubadour = new Troubadour('sox');

      troubadour.on('error', (err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });

      troubadour.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('emits an error when pased a bad location', (done) => {
      const troubadour = new Troubadour('sox');

      troubadour.on('error', (err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('filepath not found');
        done();
      });

      troubadour.play('badfilepath');
    });

  });

  describe('Pause', () => {

    it('emits a pause event when the audio is paused');

    it('sends a SIGSTOP signal to the audio process to pause it');

    it('emits an error when there is no audio playback to pause', (done) => {
      const troubadour = new Troubadour('sox');

      troubadour.on('error', (err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('no audio playback to pause');
        done();
      });

      troubadour.pause();
    });

    it('emits an error event when audio playback is not ongoing');

  });

  describe('Stop', () => {

    it('emits a stop event when the audio is stopped');

    it('sends a kill signal to the audio process to stop it');

    it('emits an error when there is no audio playback to stop', (done) => {
      const troubadour = new Troubadour('sox');

      troubadour.on('error', (err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('no audio playback to stop');
        done();
      });

      troubadour.stop();
    });

    it('emits an error event when audio playback is not ongoing');

  });

  describe('Resume', () => {

    it('emits an error when there is no audio playback to resume', (done) => {
      const troubadour = new Troubadour('sox');

      troubadour.on('error', (err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('no audio playback to resume');
        done();
      });

      troubadour.resume();
    });

    it('sends a SIGCONT signal to the audio process to resume it');

    it('emits an error event when audio playback is not ongoing');

  });

});
