# Jukebox
[![Build Status](https://travis-ci.com/jaredpetersen/jukebox.svg?token=U58FHdxksYsWZzj98oVM&branch=master)](https://travis-ci.com/jaredpetersen/jukebox)

Jukebox is wrapper over command-line audio players that makes it easy to play audio in Node.js. At this point, only Sox is supported but other audio players can easily be added.

## Installation
```
npm install jukebox
```
Since Jukebox only supports Sox at the moment, you will need to install Sox in order to use the module. In the future, you will be able to use other command-line audio players but they will have to be installed separately as well.

## Usage
### Getting Started
To get started, require the module in your program and create a new Jukebox instance by passing the name of the supported audio player into the constructor.

```javascript
var Jukebox = require('jukebox');
var jukebox = new Jukebox('sox');
```

Jukebox is an [event emitter](https://nodejs.org/api/events.html) that indicates when certain actions are being performed by the audio player. The following code snippet shows how to add an event listener to your new `jukebox` player.

```javascript
jukebox.on('eventname', function() {
  // Event listener function
});
```

You do not need to have listeners in order to use Jukebox but they provide a programmatic way of defining actions that you would like to take when the audio playback starts, pauses, stops, etc.

### Play
To play an audio source, use the `play` function and pass in the file path of the audio source that is to be played:

```javascript
jukebox.on('start', function() {
  // Do something here when the audio starts playing
});

jukebox.play('~/Music/audiofile.mp3');
```

### Pause
To pause the playback (with the ability to resume later), use the `pause` function:

```javascript
jukebox.on('pause', function() {
  // Do something here when the audio is paused
});

jukebox.pause();
```

### Stop
To stop the playback (without the ability to resume later), use the `stop` function:

```javascript
jukebox.on('stop', function() {
  // Do something here when the audio is paused
});

jukebox.stop();
```

### Errors
Jukebox handles errors in two different ways: abruptly throwing an error when the error was not recoverable or gracefully emitting the error when it is recoverable.

Errors like not passing the name of a supported command-line audio player to the Jukebox constructor are not recoverable, so the module will throw an error. Errors like calling the `play` function without a file path specified are recoverable, so Jukebox will just emit an error event to let the user know.

The error listener can be set up by including the following:

```javascript
jukebox.on('error', function(error) {
  // Do something here to handle the errors
});
```

The `error` parameter in the callback listener function is an error object. Just like any error object, accessing the error message can be done through `error.message`.
