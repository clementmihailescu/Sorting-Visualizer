'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

describe('reduceReducers()', function () {
  it('combines multiple reducers into a single reducer', function () {
    var reducer = _2['default'](function (prev, curr) {
      return _extends({}, prev, { A: prev.A + curr });
    }, function (prev, curr) {
      return _extends({}, prev, { B: prev.B * curr });
    });

    expect(reducer({ A: 1, B: 2 }, 3)).to.deep.equal({ A: 4, B: 6 });
    expect(reducer({ A: 5, B: 8 }, 13)).to.deep.equal({ A: 18, B: 104 });
  });

  it('chains multiple reducers into a single reducer', function () {
    var addReducer = function addReducer(prev, curr) {
      return _extends({}, prev, { A: prev.A + curr });
    };
    var multReducer = function multReducer(prev, curr) {
      return _extends({}, prev, { A: prev.A * curr });
    };
    var reducerAddMult = _2['default'](addReducer, multReducer);
    var reducerMultAdd = _2['default'](multReducer, addReducer);

    expect(reducerAddMult({ A: 1, B: 2 }, 3)).to.deep.equal({ A: 12, B: 2 });
    expect(reducerMultAdd({ A: 1, B: 2 }, 3)).to.deep.equal({ A: 6, B: 2 });
  });
});