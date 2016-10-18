'use strict';

var expect = require('chai').expect;
var Troubadour = require('../index.js');

describe('Troubadour (index.js)', function() {

  describe('Constructor', function() {

    it('throws an error when it is not passed the name of a audio player library', function(done) {
      try {
        var troubadour = new Troubadour();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('audio library not specified');
        done();
      }
    });

    it('throws an error when it is passsed the name of a non-supported audio player library', function(done) {
      try {
        var troubadour = new Troubadour('pikachu');
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('audio library not supported');
        done();
      }
    });

  });

  describe('Play', function() {

    /* A lot of these test use sox for the audio player library, but integration
       with sox is not actually being tested here, just the functionality before
       the library is invoked */

    it('emits an error when it is not passed a filepath', function(done) {
      var troubadour = new Troubadour('sox');
      troubadour.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('filepath not specified');
        done();
      });
      troubadour.play();
    });

    it('emits an error when another command is injected (;)', function(done) {
      var troubadour = new Troubadour('sox');
      troubadour.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });
      troubadour.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('emits an error when another command is injected (&&)', function(done) {
      var troubadour = new Troubadour('sox');
      troubadour.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });
      troubadour.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('emits an error when another command is injected (||)', function(done) {
      var troubadour = new Troubadour('sox');
      troubadour.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });
      troubadour.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('emits an error when pased a bad location', function(done) {
      var troubadour = new Troubadour('sox');
      troubadour.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('filepath not found');
        done();
      });
      troubadour.play('badfilepath');
    });

  });

  // No need to test Pause, Stop, or Resume here, since they only call the audio player library

});
