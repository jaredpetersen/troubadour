'use strict';

const process = require('child_process');

exports.play = (emitter, command, args, filepath) => {
  // Check for missing parameters
  if (emitter == null || command == null || filepath == null) {
    throw new Error('missing parameter(s)');
  }

  // Set up audio player args
  let processArguments = [];

  // Make sure the user either didn't send us args or sent them as an array
  if (Array.isArray(args)) {
    // Do not pass reference, copy the args array
    processArguments = args.slice();
  }
  else if (args != null) {
    throw new Error('malformed audio process argument(s)');
  }

  processArguments.push(filepath);

  // Start the audio playback
  let audioProcess = process.spawn(command, processArguments);

  // Handle the data the audioProcess emits
  const handleDataEvent = (data) => {
    audioProcess.stderr.removeListener('data', handleDataEvent);
    emitter.emit('start');
  };

  // Listen for the data audioProcess emits
  audioProcess.stderr.setEncoding('utf-8');
  audioProcess.stderr.once('data', handleDataEvent);
  audioProcess.once('close', () => {
    // Clear up the audio process once the playback is done
    emitter.audioProcess = null;
    emitter.emit('end');
  });
  audioProcess.once('error', () => { emitter.emit('error', new Error('audio process encountered an error')); });

  return audioProcess;
}
