# Jukebox
[![Build Status](https://travis-ci.com/jaredpetersen/jukebox.svg?token=U58FHdxksYsWZzj98oVM&branch=master)](https://travis-ci.com/jaredpetersen/jukebox)

Play audio files with Node.js

## Usage
Jukebox is an interface over a command-line audio player program. It calls the audio player and (emits events)[https://nodejs.org/api/events.html] based on the actions that were requested of the audio player and the responses that were received.

You start by requiring the module and passing the name of the supported audio player to the constructor. At this point, only Sox is supported but other audio players can be added.

```javascript
var Jukebox = require('jukebox');
var jukebox = new Jukebox('sox');
```

Listeners can then be added to your new `jukebox` instance that listen for events emitted by the audio player and then execute functions based on the events.

```javascript
jukebox.on('start', function() {
  // Do something here
});
```

### Play
To play an audio source, use the `play` function and pass in the file path of the audio source that is to be played:

```javascript
jukebox.on('start', function() {
  // Do something here
});

jukebox.play('~/Music/audiofile.mp3');
```

### Pause
To pause the playback (with the ability to resume later), use the `pause` function:

```javascript
jukebox.on('pause', function() {
  // Do something here
});

jukebox.pause();
```

### Stop
To stop the playback (without the ability to resume later), use the `stop` function:

```javascript
jukebox.on('stop', function() {
  // Do something here
});

jukebox.stop();
```

### Errors
Jukebox handles errors in two different ways: throwing an error when the mistake was not recoverable and emitting the error when it is. Mistakes like not passing the name of a supported command-line audio player to the Jukebox constructor are not recoverable, so an error will be thrown. Mistakes like calling the play function without a file path specified are recoverable, so Jukebox will just emit an error event to let the user know.

```javascript
jukebox.on('error', function(error) {
  // Do something here
});
```

The `error` parameter in the callback listener function is an error object. Just like any error object, accessing the message that indicates what went wrong can be done through `error.message`.
