(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
elementResizeEvent = require('../index.js');

element = document.getElementById("resize");
window.p = p = document.getElementById("width");
console.log(p);
console.log(elementResizeEvent);
console.log(elementResizeEvent(element, function() {
  console.log("resized!");
  console.log(element.offsetWidth);
  console.log(p);
  console.log(element.offsetWidth + "px wide");
  p.innerHTML = element.offsetWidth + "px wide";
}));

},{"../index.js":2}],2:[function(require,module,exports){
var exports = function exports(element, fn) {
  var window = this
  var document = window.document
  var isIE
  var requestFrame

  var attachEvent = document.attachEvent
  if (typeof navigator !== 'undefined') {
    isIE = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/)
  }

  requestFrame = (function () {
    var raf = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
          function fallbackRAF(func) {
            return window.setTimeout(func, 20)
          }
    return function requestFrameFunction(func) {
      return raf(func)
    }
  })()

  var cancelFrame = (function () {
    var cancel = window.cancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
          window.clearTimeout
    return function cancelFrameFunction(id) {
      return cancel(id)
    }
  })()

  function resizeListener(e) {
    var win = e.target || e.srcElement
    if (win.__resizeRAF__) {
      cancelFrame(win.__resizeRAF__)
    }
    win.__resizeRAF__ = requestFrame(function () {
      var trigger = win.__resizeTrigger__
      trigger.__resizeListeners__.forEach(function (fn) {
        fn.call(trigger, e)
      })
    })
  }

  function objectLoad() {
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
  }

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    if (attachEvent) {
      element.__resizeTrigger__ = element
      element.attachEvent('onresize', resizeListener)
    } else {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative'
      }
      var obj = element.__resizeTrigger__ = document.createElement('object')
      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;')
      obj.setAttribute('class', 'resize-sensor')
      obj.__resizeElement__ = element
      obj.onload = objectLoad
      obj.type = 'text/html'
      if (isIE) {
        element.appendChild(obj)
      }
      obj.data = 'about:blank'
      if (!isIE) {
        element.appendChild(obj)
      }
    }
  }
  element.__resizeListeners__.push(fn)
}

module.exports = (typeof window === 'undefined') ? exports : exports.bind(window)

},{}]},{},[1]);
