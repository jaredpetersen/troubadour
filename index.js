'use strict';

const EventEmitter = require('events');
let process = require('child_process');
const fs = require('fs');
const supportedAudioPlayers = require('./lib/supportedAudioPlayers');
const audioPlayer = require('./lib/audioPlayer');

class Troubadour extends EventEmitter {

  constructor(audioPlayerName) {
    super();

    // Determine which audio player to use
    if (audioPlayerName == null) {
      throw new Error('audio player not specified');
    }

    // Set up the audio player process
    this.audioProcess = null;

    // Loop over the supported audio players
    supportedAudioPlayers.some((player) => {
      if (player.name == audioPlayerName) {
        return this.player = player;
      }
    });

    // Confirm the user inputted a supported audio player
    if (this.player == null) {
      throw new Error('audio player not supported');
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
      this.audioProcess = audioPlayer.play(this, this.player.command, this.player.arguments, filepath);
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
