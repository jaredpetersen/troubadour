# Troubadour
[![Build Status](https://travis-ci.com/jaredpetersen/troubadour.svg?token=U58FHdxksYsWZzj98oVM&branch=master)](https://travis-ci.com/jaredpetersen/troubadour)

Troubadour is wrapper over command-line audio players that makes it easy to play audio in Node.js. At this point, only Sox is supported but other audio players can easily be added.

## Installation
```
npm install troubadour
```
Since Troubadour only supports Sox at the moment, you will need to install Sox in order to use the module. In the future, you will be able to use other command-line audio players but they will have to be installed separately as well.

## Usage
### Getting Started
To get started, require the module in your program and create a new Troubadour instance by passing the name of the supported audio player into the constructor.

```javascript
var Troubadour = require('troubadour');
var troubadour = new Troubadour('sox');
```

Troubadour is an [event emitter](https://nodejs.org/api/events.html) that indicates when certain actions are being performed by the audio player. The following code snippet shows how to add an event listener to your new `troubadour` player.

```javascript
troubadour.on('eventname', function() {
  // Event listener function
});
```

You do not need to have listeners set up in order to use Troubadour but they provide a programmatic way of defining actions that you would like to take when the audio playback starts, pauses, stops, resumes, etc.

### Play
To play an audio source, use the `play` function and pass in the file path of the audio source that is to be played:

```javascript
troubadour.on('start', function() {
  // Do something here when the audio starts playing
});

troubadour.play('~/Music/audiofile.mp3');
```

### Pause
Pause the playback (with the ability to resume later) by using the `pause` function:

```javascript
troubadour.on('pause', function() {
  // Do something here when the audio is paused
});

troubadour.pause();
```

### Stop
Stop the playback (without the ability to resume later) by using the `stop` function:

```javascript
troubadour.on('stop', function() {
  // Do something here when the audio is paused
});

troubadour.stop();
```

### Resume
Resume the playback from a paused state by using the `resume` function:

```javascript
troubadour.on('resume', function() {
  // Do something here when the audio is resumed
});

troubadour.resume();
```

### Errors
Troubadour handles errors in two different ways: abruptly throwing an error when the error is not recoverable or gracefully emitting the error when it is recoverable.

Errors like not passing the name of a supported command-line audio player to the Troubadour constructor are not recoverable, so the module will throw an error. Errors like calling the `play` function without specifying a file path are recoverable, so Troubadour will just emit an error event to let the user know.

The error listener can be set up by including the following:

```javascript
troubadour.on('error', function(error) {
  // Do something here to handle the errors
});
```

The `error` parameter in the callback listener function is an error object. Just like any error object, accessing the error message can be done through `error.message`.
