'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var onElementResize = require('element-resize-event');

var defaultContainerStyle = {
  width: '100%',
  height: '100%',
  padding: 0,
  border: 0
};

function defaultGetWidth(element) {
  return element.clientWidth;
}

function defaultGetHeight(element) {
  return element.clientHeight;
}

/**
 * Wraps a react component and adds properties `containerHeight` and
 * `containerWidth`. Useful for responsive design. Properties update on
 * window resize. **Note** that the parent element must have either a
 * height or a width, or nothing will be rendered
 *
 * Can be used as a
 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
 * (see examples)
 *
 * @param {object} [options]
 * @param {function} [options.getHeight] A function that is passed an element and returns element
 * height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
 * @param {function} [options.getWidth]  A function that is passed an element and returns element
 * width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
 * @param {object} [options.containerStyle] A style object for the `<div>` that will wrap your component.
 * The dimensions of this `div` are what are passed as props to your component. The default style is
 * `{ width: '100%', height: '100%', padding: 0, border: 0 }` which will cause the `div` to fill its
 * parent in most cases. If you are using a flexbox layout you will want to change this default style.
 * @param {string} [options.className] Control the class name set on the wrapper `<div>`
 * @param {boolean} [options.elementResize=false] Set true to watch the wrapper `div` for changes in
 * size which are not a result of window resizing - e.g. changes to the flexbox and other layout.
 * @return {function}                   A higher-order component that can be
 * used to enhance a react component `Dimensions()(MyComponent)`
 *
 * @example
 * // ES2015
 * import React from 'react'
 * import Dimensions from 'react-dimensions'
 *
 * class MyComponent extends React.Component {
 *   render() (
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )
 * }
 *
 * export default Dimensions()(MyComponent) // Enhanced component
 *
 * @example
 * // ES5
 * var React = require('react')
 * var Dimensions = require('react-dimensions')
 *
 * var MyComponent = React.createClass({
 *   render: function() {(
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )}
 * }
 *
 * module.exports = Dimensions()(MyComponent) // Enhanced component
 *
 */
module.exports = function Dimensions() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$getHeight = _ref.getHeight;
  var getHeight = _ref$getHeight === undefined ? defaultGetHeight : _ref$getHeight;
  var _ref$getWidth = _ref.getWidth;
  var getWidth = _ref$getWidth === undefined ? defaultGetWidth : _ref$getWidth;
  var _ref$containerStyle = _ref.containerStyle;
  var containerStyle = _ref$containerStyle === undefined ? defaultContainerStyle : _ref$containerStyle;
  var _ref$className = _ref.className;
  var className = _ref$className === undefined ? null : _ref$className;
  var _ref$elementResize = _ref.elementResize;
  var elementResize = _ref$elementResize === undefined ? false : _ref$elementResize;

  return function (ComposedComponent) {
    return function (_React$Component) {
      _inherits(DimensionsHOC, _React$Component);

      function DimensionsHOC() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DimensionsHOC);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DimensionsHOC)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _this.updateDimensions = function () {
          var container = _this.refs.container;
          var containerWidth = getWidth(container);
          var containerHeight = getHeight(container);

          if (containerWidth !== _this.state.containerWidth || containerHeight !== _this.state.containerHeight) {
            _this.setState({ containerWidth: containerWidth, containerHeight: containerHeight });
          }
        }, _this.onResize = function () {
          if (_this.rqf) return;
          _this.rqf = _this.getWindow().requestAnimationFrame(function () {
            _this.rqf = null;
            _this.updateDimensions();
          });
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }
      // ES7 Class properties
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers


      // Using arrow functions and ES7 Class properties to autobind
      // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions


      _createClass(DimensionsHOC, [{
        key: 'getWindow',


        // If the component is mounted in a different window to the javascript
        // context, as with https://github.com/JakeGinnivan/react-popout
        // then the `window` global will be different from the `window` that
        // contains the component.
        // Depends on `defaultView` which is not supported <IE9
        value: function getWindow() {
          return this.refs.container ? this.refs.container.ownerDocument.defaultView || window : window;
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (!this.refs.container) {
            throw new Error('Cannot find container div');
          }
          this.updateDimensions();
          if (elementResize) {
            // Experimental: `element-resize-event` fires when an element resizes.
            // It attaches its own window resize listener and also uses
            // requestAnimationFrame, so we can just call `this.updateDimensions`.
            onElementResize(this.refs.container, this.updateDimensions);
          } else {
            this.getWindow().addEventListener('resize', this.onResize, false);
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.getWindow().removeEventListener('resize', this.onResize);
        }

        /**
         * Returns the underlying wrapped component instance.
         * Useful if you need to access a method or property of the component
         * passed to react-dimensions.
         *
         * @return {object} The rendered React component
         **/

      }, {
        key: 'getWrappedInstance',
        value: function getWrappedInstance() {
          this.refs.wrappedInstance;
        }
      }, {
        key: 'render',
        value: function render() {
          var _state = this.state;
          var containerWidth = _state.containerWidth;
          var containerHeight = _state.containerHeight;

          if (!containerWidth && !containerHeight) {
            console.warn('Wrapper div has no height or width, try overriding style with `containerStyle` option');
          }
          return React.createElement(
            'div',
            { className: className, style: containerStyle, ref: 'container' },
            (containerWidth || containerHeight) && React.createElement(ComposedComponent, _extends({}, this.state, this.props, {
              updateDimensions: this.updateDimensions,
              ref: 'wrappedInstance'
            }))
          );
        }
      }]);

      return DimensionsHOC;
    }(React.Component);
  };
};
