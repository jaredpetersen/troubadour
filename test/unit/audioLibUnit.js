'use strict';

const expect = require('chai').expect;
const process = require('child_process');
const EventEmitter = require('events').EventEmitter;

exports.shouldBehaveLikeAnAudioLib = (audioLib) => {

  describe('Play', () => {

    it('throws an error when an EventEmitter is not passed to it', (done) => {
      try {
        audioLib.play(null, 'filepath');
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

    it('returns a process', (done) => {
      const eventEmitter = new EventEmitter();

      let process = audioLib.play(eventEmitter, 'filepath');
      // Find a better way to check if the return value is a process
      expect(process).to.exist;
      done();
    });

    // TODO Figure out how to mock a process using rewire
    it('emits an error event when something goes wrong with the audio process');

    it('removes the start listener on the audio process when the audio process starts playback');

    it('removes the end listener on the audio process when the audio process ends playback');

  });
};
