'use strict';

const expect = require('chai').expect;
const process = require('child_process');
const EventEmitter = require('events').EventEmitter;
const audioPlayer = require('../../lib/audioPlayer');

exports.shouldBehaveLikeAnAudioPlayer = (player) => {

  describe('Play', () => {

    it('throws an error when an EventEmitter is not passed to it', (done) => {
      try {
        audioPlayer.play(null, player.command, player.arguments, 'filepath');
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)');
        done();
      }
    });

    it('throws an error when a command is not passed to it', (done) => {
      const eventEmitter = new EventEmitter();

      try {
        audioPlayer.play(eventEmitter, null, player.arguments, 'filepath');
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)');
        done();
      }
    });

    it('throws an error when arguments is not an array but is specified (not null)', (done) => {
      const eventEmitter = new EventEmitter();

      try {
        audioPlayer.play(eventEmitter, player.command, 'pikachu', 'filepath');
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('malformed audio process argument(s)');
        done();
      }
    });

    it('does not throw an error when arguments is null', (done) => {
      const eventEmitter = new EventEmitter();

      try {
        audioPlayer.play(eventEmitter, player.command, null, 'filepath');
      }
      catch(err) {
        expect(err).to.not.exist;
      }

      done();
    });

    it('throws an error when a filepath is not passed to it', (done) => {
      const eventEmitter = new EventEmitter();

      try {
        audioPlayer.play(eventEmitter, player.command, player.arguments, null);
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)');
        done();
      }
    });

    it('throws an error when parameters are not passed', (done) => {
      try {
        audioPlayer.play();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)');
        done();
      }
    });

    it('returns a process', (done) => {
      const eventEmitter = new EventEmitter();

      let process = audioPlayer.play(eventEmitter, player.command, player.arguments, 'filepath');

      // Find a better way to check if the return value is a process
      expect(process).to.exist;
      done();
    });

    // TODO Figure out how to mock a process using rewire
    it('emits an error event when something goes wrong with the audio process');

    it('emits an end event when the audio process ends playback');

    it('emits a start event when the audio process starts playback');

    it('removes the start listener on the audio process when the audio process starts playback');

    it('removes the end listener on the audio process when the audio process ends playback');

  });
};
