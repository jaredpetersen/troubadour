'use strict';

const process = require('child_process');

exports.play = (emitter, filepath) => {
  // Check for missing parameters
  if (emitter == null || filepath == null) {
    throw new Error('missing parameter(s)');
  }

  // Start the audio playback
  let audioProcess = process.spawn('cvlc', ['--play-and-exit', filepath]);

  // Handle the data the audioProcess emits
  const handleDataEvent = (data) => {
    audioProcess.stderr.removeListener('data', handleDataEvent);
    emitter.emit('start');
  };

  // Listen for the data audioProcess emits
  audioProcess.stderr.setEncoding('utf-8');
  audioProcess.stderr.once('data', handleDataEvent);
  audioProcess.once('close', () => { audioProcess = null; emitter.emit('end'); });

  return audioProcess;
}
