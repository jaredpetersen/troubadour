'use strict';

var EventEmitter = require('events');
var process = require('child_process');

class Jukebox extends EventEmitter {

  constructor() {
    super();
    this.sox;
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

    // Start playing audio
    this.sox = process.spawn('play', [filepath]);

    // Encode the stream data
    if (this.sox.stderr) {
      this.sox.stderr.setEncoding('utf-8');
    }

    // Handle the data output from the audio process
    var handleDataEvent = function (data) {
      console.log(data);
      if (data.includes('play FAIL')) {
        this.sox.stderr.removeListener('data', handleDataEvent);
        this.emit('error', new Error('unable to play audio'));
      }
      else if (data.match(/a-z/i)) {
        console.log('getting data');
      }
    }.bind(this);

    // Listen to the audio process
    this.sox.stderr.on('data', handleDataEvent);
  }

}

// Export the module
module.exports = Jukebox;
