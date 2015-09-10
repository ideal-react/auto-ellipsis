'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _autoEllipsisCss = require('./auto-ellipsis.css');

var _autoEllipsisCss2 = _interopRequireDefault(_autoEllipsisCss);

var AutoEllipsis = (function (_React$Component) {
	_inherits(AutoEllipsis, _React$Component);

	function AutoEllipsis(props) {
		_classCallCheck(this, _AutoEllipsis);

		_get(Object.getPrototypeOf(_AutoEllipsis.prototype), 'constructor', this).call(this, props);
		this.state = { content: props.content };
	}

	_createClass(AutoEllipsis, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.computeContent();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.computeContent();
		}
	}, {
		key: 'computeContent',
		value: function computeContent() {
			var dom = _react2['default'].findDOMNode(this);
			var parentBottom = dom.getBoundingClientRect().bottom;
			var style = document.defaultView.getComputedStyle(dom, null);
			parentBottom = parentBottom - parseFloat(style.paddingBottom) - parseFloat(style.borderBottomWidth);

			var range = document.createRange();
			range.selectNodeContents(dom);
			var bottom = range.getBoundingClientRect().bottom;
			var content = this.state.content;
			if (bottom > parentBottom) {
				dom.title = content;
				var container = dom.firstChild;
				var endPoint = content.length - 1;
				range.setStart(container, 0);
				while (endPoint >= 0) {
					range.setEnd(container, endPoint);
					bottom = range.getBoundingClientRect().bottom;
					if (bottom <= parentBottom) {
						if (endPoint - 3 > 0) {
							content = content.slice(0, endPoint - 3);
							if (content[content.length - 1] !== ' ') {
								var lastIndex = content.lastIndexOf(' ');
								if (lastIndex !== -1) {
									content = content.slice(0, lastIndex);
								}
							}
							content += '...';
						} else {
							content = '...';
						}
						this.setState({ content: content });
						break;
					}
					endPoint--;
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var props = {
				styleName: 'root'
			};
			return _react2['default'].createElement(this.props.tag, props, this.state.content);
		}
	}], [{
		key: 'propTypes',
		value: {
			tag: _react2['default'].PropTypes.string,
			content: _react2['default'].PropTypes.string.isRequired
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			tag: 'div'
		},
		enumerable: true
	}]);

	var _AutoEllipsis = AutoEllipsis;
	AutoEllipsis = (0, _reactCssModules2['default'])(_autoEllipsisCss2['default'])(AutoEllipsis) || AutoEllipsis;
	return AutoEllipsis;
})(_react2['default'].Component);

exports['default'] = AutoEllipsis;
module.exports = exports['default'];