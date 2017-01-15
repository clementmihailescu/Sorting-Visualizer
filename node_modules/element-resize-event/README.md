element-resize-event
==================

Library to make it easy to listen for element resize events

Code borrowed from a [blog post by
backalleycoder.com](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/).

## Install
`npm install element-resize-event`

## Usage
```javascript
var elementResizeEvent = require('element-resize-event');

var element = document.getElementById("resize");

elementResizeEvent(element, function() {
  console.log("resized!");
  console.log(element.offsetWidth);
});
```
