'use strict';

var expect = require('chai').expect;
var process = require('child_process');
var EventEmitter = require('events').EventEmitter;
var sox = require('../lib/sox.js');

describe('Sox Audio Player Library (sox.js)', function() {

  afterEach(function() {
    try {
      process.execSync('pkill -9 play');
    }
    catch(err) {}
  });

  describe('Play', function() {

    it('emits a start event when the audio starts playing', function(done) {
      var eventEmitter = new EventEmitter();
      eventEmitter.on('start', function() {
        done();
      });
      sox.play(eventEmitter, 'test/audio/splashing_around.mp3');
    });

    it('emits an end event when the audio finishes playing', function(done) {
      this.timeout(10000);
      var eventEmitter = new EventEmitter();
      eventEmitter.on('end', function() {
        done();
      });
      sox.play(eventEmitter, 'test/audio/alarm_clock.mp3');
    });

    it('throws an error when an EventEmitter is not passed to it', function(done) {
      try {
        sox.play('test/audio/splashing_around.mp3');
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
        sox.play(eventEmitter);
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)');
        done();
      }
    });

    it('throws an error when parameters are not passed', function(done) {
      try {
        sox.play();
      }
      catch(err) {
        expect(err).to.exist;
        expect(err.message).to.equal('missing parameter(s)')
        done();
      }
    });

  });

});
