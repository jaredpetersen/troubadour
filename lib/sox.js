'use strict';

const process = require('child_process');

exports.play = (emitter, filepath) => {
  // Check for missing parameters
  if (emitter == null || filepath == null) {
    throw new Error('missing parameter(s)');
  }

  // Start the audio playback
  let audioProcess = process.spawn('play', [filepath]);

  // Handle the data the audioProcess emits
  const handleDataEvent = (data) => {
    // Check for errors
    if (data.includes('play FAIL')) {
      audioProcess.stderr.removeListener('data', handleDataEvent);
      emitter.emit('data', new Error('unable to play audio'));
    }
    // If there's non-error text, audioProcess was able to play the audio
    else if (data.match(/[a-z]/i)) {
      audioProcess.stderr.removeListener('data', handleDataEvent);
      emitter.emit('start');
    }
  };

  // Listen for the data audioProcess emits
  audioProcess.stderr.setEncoding('utf-8');
  audioProcess.stderr.on('data', handleDataEvent);
  audioProcess.on('close', () => { audioProcess = null; emitter.emit('end'); });
  audioProcess.on('error', () => { throw new Error('audioProcess encountered an error'); });

  return audioProcess;
}
