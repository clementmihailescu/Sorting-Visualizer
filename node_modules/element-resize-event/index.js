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
      if(trigger !== undefined) {
        trigger.__resizeListeners__.forEach(function (fn) {
          fn.call(trigger, e)
        })
      }
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
      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;')
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

exports.unbind = function(element, fn){
  var attachEvent = document.attachEvent;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    if (attachEvent) {
      element.detachEvent('onresize', resizeListener);
    } else {
      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
    }
  }
}

module.exports = (typeof window === 'undefined') ? exports : exports.bind(window)
