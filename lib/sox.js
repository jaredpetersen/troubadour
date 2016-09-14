'use strict';

var process = require('child_process');
var sox;

exports.play = function(emitter, filepath) {
  // Check for missing parameters
  if (emitter == null || filepath == null) {
    throw new Error('missing parameter(s)');
  }

  // Start the audio playback
  sox = process.spawn('play', [filepath]);

  // Handle the data sox emits
  var handleDataEvent = function(data) {
    // Check for errors
    if (data.includes('play FAIL')) {
      sox.stderr.removeListener('data', handleDataEvent);
      emitter.emit('data', new Error('Unable to play audio'));
    }
    // If there's non-error text, sox was able to play the audio
    else if (data.match(/[a-z]/i)) {
      sox.stderr.removeListener('data', handleDataEvent);
      emitter.emit('start');
    }
  };

  // Listen for the data sox emits
  sox.stderr.setEncoding('utf-8');
  sox.stderr.on('data', handleDataEvent);
  sox.on('error', function() { throw new Error('Sox is not installed'); });
}
