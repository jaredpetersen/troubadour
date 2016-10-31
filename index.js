'use strict';

const EventEmitter = require('events');
let process = require('child_process');
const fs = require('fs');
const audioLibs = require('./lib/audioLibs');

class Troubadour extends EventEmitter {

  constructor(audioPlayer) {
    super();

    // Determine which audio player library to use
    if (audioPlayer == null) {
      throw new Error('audio library not specified');
    }

    // Set up the audio player process
    this.audioProcess = null;

    // Loop over the available audio player libraries
    audioLibs.some((lib) => {
      if (lib.name == audioPlayer) {
        this.audioPlayerLib = lib.audioPlayerLibrary;
        return this.audioPlayerLib;
      }
    });

    // Confirm the user inputted a supported audio player library
    if (this.audioPlayerLib == null) {
      throw new Error('audio library not supported');
    }
  }

  play(filepath) {
    if (filepath == null) {
      this.emit('error', new Error('filepath not specified'));
    }
    else if (filepath.includes(';') || filepath.includes('&&') || filepath.includes('||')) {
      this.emit('error', new Error('invalid filepath'));
    }
    else if(fs.existsSync(filepath) === false) {
      this.emit('error', new Error('filepath not found'));
    }
    else {
      this.audioProcess = this.audioPlayerLib.play(this, filepath);
    }
  }

  pause() {
    if (this.audioProcess == null) {
      this.emit('error', new Error('no audio playback to pause'));
    }
    else {
      this.audioProcess.kill('SIGSTOP');
      this.emit('pause');
    }
  }

  stop() {
    if (this.audioProcess == null) {
      this.emit('error', new Error('no audio playback to stop'));
    }
    else {
      this.audioProcess.kill();
      this.audioProcess == null;
      this.emit('stop');
    }
  }

  resume() {
    if (this.audioProcess == null) {
      this.emit('error', new Error('no audio playback to resume'));
    }
    else {
      this.audioProcess.kill('SIGCONT');
      this.emit('resume');
    }
  }

}

// Export the module
module.exports = Troubadour;
