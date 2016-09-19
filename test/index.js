'use strict';

var expect = require('chai').expect;
var Jukebox = require('../index.js');

describe('Jukebox (index.js)', function() {

  describe('Constructor', function() {

    it('throws an error when it is not passed the name of a audio player library', function(done) {
      try {
        var jukebox = new Jukebox();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('audio library not specified');
        done();
      }
    });

    it('throws an error when it is passsed the name of a non-supported audio player library', function(done) {
      try {
        var jukebox = new Jukebox('pikachu');
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('audio library not supported');
        done();
      }
    });

  });

  describe('Play', function() {

    it('returns an error when it is not passed a filepath', function(done) {
      var jukebox = new Jukebox('sox');
      jukebox.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('filepath not specified');
        done();
      });
      jukebox.play();
    });

    it('returns an error when another command is injected (;)', function(done) {
      var jukebox = new Jukebox('sox');
      jukebox.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });
      jukebox.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('returns an error when another command is injected (&&)', function(done) {
      var jukebox = new Jukebox('sox');
      jukebox.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });
      jukebox.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('returns an error when another command is injected (||)', function(done) {
      var jukebox = new Jukebox('sox');
      jukebox.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid filepath');
        done();
      });
      jukebox.play('test/audio/splashing_around.mp3; echo "hacked"');
    });

    it('returns an error when pased a bad location', function(done) {
      var jukebox = new Jukebox('sox');
      jukebox.on('error', function(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('filepath not found');
        done();
      });
      jukebox.play('badfilepath');
    });

  });

  describe('Pause', function() {

    it('returns an error when audio playback is not ongoing')

  });

  describe('Stop', function() {

    it('returns an error when audio playback is not ongoing')

  });

});
