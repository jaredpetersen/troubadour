'use strict';

var EventEmitter = require('events');

class Jukebox extends EventEmitter {

  constructor() {
    super();
  }

  play(filepath) {
    // Make sure the user sent a valid filepath
    if (filepath == null) {
      this.emit('error', new Error('filepath not specified'));
    }
    else if (filepath.includes(';') || filepath.includes('&&') || filepath.includes('||'))
    {
      this.emit('error', new Error('invalid filepath'));
    }

    //this.emit('error', new Error('Unable to play audio'));
  }

}

// Export the module
module.exports = Jukebox;
