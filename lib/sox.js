'use strict';

const process = require('child_process');
let sox;

exports.play = (emitter, filepath) => {
  // Check for missing parameters
  if (emitter == null || filepath == null) {
    throw new Error('missing parameter(s)');
  }

  // Start the audio playback
  sox = process.spawn('play', [filepath]);

  // Handle the data sox emits
  const handleDataEvent = (data) => {
    // Check for errors
    if (data.includes('play FAIL')) {
      sox.stderr.removeListener('data', handleDataEvent);
      emitter.emit('data', new Error('unable to play audio'));
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
  sox.on('close', () => { sox = null; emitter.emit('end'); });
  sox.on('error', () => { throw new Error('sox encountered an error'); });
}

exports.pause = (emitter) => {
  // Check for missing parameters
  if (emitter == null) {
    throw new Error('missing parameter');
  }

  // Check if audio playback is ongoing
  if (sox == null) {
    emitter.emit('error', new Error('no audio playback to pause'));
    return;
  }

  // Pause the audio playback
  sox.kill('SIGSTOP');

  // Emit the pause event
  emitter.emit('pause');
}

exports.stop = (emitter) => {
  // Check for missing parameters
  if (emitter == null) {
    throw new Error('missing parameter');
  }

  // Check if audio playback is ongoing
  if (sox == null) {
    emitter.emit('error', new Error('no audio playback to stop'));
    return;
  }

  // Stop the audio playback
  sox.kill();
  sox == null;

  // Emit the stop event
  emitter.emit('stop');
}

exports.resume = (emitter) => {
  // Check for missing parameters
  if (emitter == null) {
    throw new Error('missing parameter');
  }

  // Check if audio can be resumed
  if (sox == null) {
    emitter.emit('error', new Error('no audio playback to resume'));
    return;
  }

  // Resume the audio playback
  sox.kill('SIGCONT');

  // Emit the resume event
  emitter.emit('resume');
}
