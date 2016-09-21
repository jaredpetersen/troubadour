'use strict';

var EventEmitter = require('events');
var process = require('child_process');

class Jukebox extends EventEmitter {

  constructor(audioPlayer) {
    super();

    // Determine which audio player library to use
    if (audioPlayer == null) {
      throw new Error('audio library not specified');
    }
    else if (audioPlayer.toLowerCase() == 'sox') {
      this.audioPlayerLib = require('./lib/sox.js');
    }
    else {
      throw new Error('audio library not supported')
    }
  }

  play(filepath) {
    // Make sure the user sent a valid filepath
    if (filepath == null) {
      this.emit('error', new Error('filepath not specified'));
      return;
    }
    else if (filepath.includes(';') || filepath.includes('&&') || filepath.includes('||')) {
      this.emit('error', new Error('invalid filepath'));
      return;
    }

    // Confirm that the filepath exists
    try {
      process.execSync('find ' + filepath, {stdio: 'ignore'});
    }
    catch(err) {
      this.emit('error', new Error('filepath not found'));
      return;
    }

    this.audioPlayerLib.play(this, filepath);
  }

  pause() {
    this.audioPlayerLib.pause(this);
  }

  stop() {
    this.audioPlayerLib.stop(this);
  }

}

// Export the module
module.exports = Jukebox;
