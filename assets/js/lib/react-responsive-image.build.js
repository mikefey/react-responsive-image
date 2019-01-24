(function e(n,t){if(typeof exports==="object"&&typeof module==="object")module.exports=t(require("react"),require("prop-types"));else if(typeof define==="function"&&define.amd)define(["react","prop-types"],t);else if(typeof exports==="object")exports["ResponsiveImage"]=t(require("react"),require("prop-types"));else n["ResponsiveImage"]=t(n["react"],n["prop-types"])})(window,function(__WEBPACK_EXTERNAL_MODULE__0__,__WEBPACK_EXTERNAL_MODULE__1__){return function(t){var r={};function o(e){if(r[e]){return r[e].exports}var n=r[e]={i:e,l:false,exports:{}};t[e].call(n.exports,n,n.exports,o);n.l=true;return n.exports}o.m=t;o.c=r;o.d=function(e,n,t){if(!o.o(e,n)){Object.defineProperty(e,n,{enumerable:true,get:t})}};o.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})};o.t=function(n,e){if(e&1)n=o(n);if(e&8)return n;if(e&4&&typeof n==="object"&&n&&n.__esModule)return n;var t=Object.create(null);o.r(t);Object.defineProperty(t,"default",{enumerable:true,value:n});if(e&2&&typeof n!="string")for(var r in n)o.d(t,r,function(e){return n[e]}.bind(null,r));return t};o.n=function(n){var e=n&&n.__esModule?function e(){return n["default"]}:function e(){return n};o.d(e,"a",e);return e};o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)};o.p="";return o(o.s=2)}([function(module,exports){eval("module.exports = __WEBPACK_EXTERNAL_MODULE__0__;\n\n//# sourceURL=webpack://ResponsiveImage/external_%22react%22?")},function(module,exports){eval("module.exports = __WEBPACK_EXTERNAL_MODULE__1__;\n\n//# sourceURL=webpack://ResponsiveImage/external_%22prop-types%22?")},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.ResponsiveImageSize = exports.ResponsiveImage = undefined;\n\nvar _ResponsiveImage = __webpack_require__(3);\n\nvar _ResponsiveImage2 = _interopRequireDefault(_ResponsiveImage);\n\nvar _ResponsiveImageSize = __webpack_require__(4);\n\nvar _ResponsiveImageSize2 = _interopRequireDefault(_ResponsiveImageSize);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.ResponsiveImage = _ResponsiveImage2.default;\nexports.ResponsiveImageSize = _ResponsiveImageSize2.default;\n\n//# sourceURL=webpack://ResponsiveImage/./assets/js/src/index.js?')},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(1);\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ResponsiveImage = function (_React$Component) {\n  _inherits(ResponsiveImage, _React$Component);\n\n  function ResponsiveImage(props) {\n    _classCallCheck(this, ResponsiveImage);\n\n    // used by React as the component name\n    var _this = _possibleConstructorReturn(this, (ResponsiveImage.__proto__ || Object.getPrototypeOf(ResponsiveImage)).call(this, props));\n\n    _this.displayName = 'ResponsiveImage';\n\n    // bind 'this' to functions\n    _this.getInitialSize = _this.getInitialSize.bind(_this);\n    _this.onResize = _this.onResize.bind(_this);\n    _this.getCurrentSizeClone = _this.getCurrentSizeClone.bind(_this);\n    _this.loadImage = _this.loadImage.bind(_this);\n\n    // initial state object\n    _this.state = {\n      currentImageSize: _this.getInitialSize(),\n      loadInitiated: false,\n      windowSize: {\n        width: 0,\n        height: 0\n      }\n    };\n    return _this;\n  }\n\n  /**\n   * Called after component mounts to DOM\n   * @returns {undefined} undefined\n   */\n\n\n  _createClass(ResponsiveImage, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      window.addEventListener('resize', this.onResize);\n      this.onResize();\n    }\n\n    /**\n     * Called after component updates, checks to see if the loadImage prop\n     * was set to true and loads image accordingly\n     * @param {Object} prevProps - The component's props before the update\n     * @returns {undefined} undefined\n     */\n\n  }, {\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate(prevProps) {\n      var loadImage = this.props.loadImage;\n\n\n      if (!prevProps.loadImage && loadImage) {\n        this.loadImage();\n      }\n    }\n\n    /**\n     * Called before component is removed from the DOM\n     * @returns {undefined} undefined\n     */\n\n  }, {\n    key: 'componentWillUnmount',\n    value: function componentWillUnmount() {\n      window.removeEventListener('resize', this.onResize);\n    }\n\n    /**\n     * Renders component\n     * @returns {ReactElement} React element\n     */\n\n  }, {\n    key: 'render',\n    value: function render() {\n      var className = this.props.className;\n\n      var currentSizeClone = this.getCurrentSizeClone();\n      var additionalClass = className ? ' ' + className : '';\n      var newClassName = 'component-responsive-image' + additionalClass;\n\n      return _react2.default.createElement(\n        'div',\n        { className: newClassName },\n        currentSizeClone\n      );\n    }\n\n    /**\n     * Gets the initial size\n     * @returns {undefined} undefined\n     */\n\n  }, {\n    key: 'getInitialSize',\n    value: function getInitialSize() {\n      var children = this.props.children;\n\n      var initialSize = void 0;\n\n      for (var i = 0; i < children.length; i++) {\n        if (children[i].props.default) {\n          initialSize = children[i];\n        }\n      }\n\n      if (!initialSize) {\n        initialSize = children[0];\n      }\n\n      return initialSize;\n    }\n\n    /**\n     * Returns a clone of the current image size with added props\n     * @returns {undefined} undefined\n     */\n\n  }, {\n    key: 'getCurrentSizeClone',\n    value: function getCurrentSizeClone() {\n      var _this2 = this;\n\n      var _props = this.props,\n          alt = _props.alt,\n          background = _props.background,\n          lazy = _props.lazy,\n          loadImage = _props.loadImage,\n          onLoad = _props.onLoad,\n          preloadBackground = _props.preloadBackground,\n          imageStyle = _props.imageStyle;\n      var _state = this.state,\n          currentImageSize = _state.currentImageSize,\n          loadInitiated = _state.loadInitiated,\n          windowSize = _state.windowSize;\n\n\n      return _react2.default.cloneElement(currentImageSize, {\n        alt: alt,\n        background: background,\n        key: 'image-size-' + currentImageSize.props.minWidth,\n        lazy: lazy,\n        loadInitiated: loadInitiated,\n        loadImage: loadImage,\n        onLoad: onLoad,\n        preloadBackground: preloadBackground,\n        ref: function ref(cis) {\n          return _this2.currentImageSize = cis;\n        },\n        imageStyle: imageStyle,\n        windowSize: windowSize\n      });\n    }\n\n    /**\n     * Resize handler\n     * @returns {undefined} undefined\n     */\n\n  }, {\n    key: 'onResize',\n    value: function onResize() {\n      var currentImageSize = void 0;\n      var children = this.props.children;\n\n      var windowSize = {\n        width: window.innerWidth,\n        height: window.innerHeight\n      };\n\n      for (var i = 0; i < children.length; i++) {\n        var childProps = children[i].props;\n\n        if (windowSize.width >= childProps.minWidth) {\n          currentImageSize = children[i];\n        }\n      }\n\n      this.setState({\n        windowSize: windowSize,\n        currentImageSize: currentImageSize\n      });\n    }\n\n    /**\n     * Loads the image, intended as a public method to lazy load the image\n     * @returns {undefined} undefined\n     */\n\n  }, {\n    key: 'loadImage',\n    value: function loadImage() {\n      this.setState({ loadInitiated: true });\n      this.currentImageSize.preloadImage();\n    }\n  }]);\n\n  return ResponsiveImage;\n}(_react2.default.Component);\n\n/**\n * Expected propTypes\n * @prop {String} alt - The value for the image alt attribute\n * @prop {Boolean} background - If set to true, the comopnent will render a\n * background image\n * @prop {Array|Object} children - The child elements of the component\n * @prop {String} className - An additional className to add to the component\n * @prop {Object} imageStyle - A style object to add to the component\n * @prop {Boolean} lazy - If the component should lazy-load the image\n * @prop {Function} loadImage - Set to true to load an image, when the lazy prop is set to true\n * @prop {Function} onLoad - A callback to fire when the image is loaded\n * @prop {Boolean} preloadBackground - If the image is a background image,\n * setting this to true will preload it before displaying\n */\n\n\nResponsiveImage.propTypes = {\n  alt: _propTypes2.default.string,\n  background: _propTypes2.default.bool,\n  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),\n  className: _propTypes2.default.string,\n  imageStyle: _propTypes2.default.object,\n  lazy: _propTypes2.default.bool,\n  loadImage: _propTypes2.default.bool,\n  onLoad: _propTypes2.default.func,\n  preloadBackground: _propTypes2.default.bool\n};\n\nexports.default = ResponsiveImage;\n\n//# sourceURL=webpack://ResponsiveImage/./assets/js/src/components/ResponsiveImage.jsx?")},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(1);\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ResponsiveImageSize = function (_React$Component) {\n  _inherits(ResponsiveImageSize, _React$Component);\n\n  function ResponsiveImageSize(props) {\n    _classCallCheck(this, ResponsiveImageSize);\n\n    var _this = _possibleConstructorReturn(this, (ResponsiveImageSize.__proto__ || Object.getPrototypeOf(ResponsiveImageSize)).call(this, props));\n\n    var _this$props = _this.props,\n        preloadBackground = _this$props.preloadBackground,\n        lazy = _this$props.lazy,\n        loadInitiated = _this$props.loadInitiated,\n        background = _this$props.background,\n        path = _this$props.path;\n\n    // used by React as the component name\n\n    _this.displayName = 'ResponsiveImageSize';\n\n    // blank 1px X 1px .gif in base64 format\n    _this.placeHolderUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///' + 'yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';\n\n    // initial state object\n    _this.state = {\n      imagePath: preloadBackground || lazy && !loadInitiated ? _this.placeHolderUrl : path,\n      loaded: background && !preloadBackground,\n      fileWidth: 0,\n      fileHeight: 0\n    };\n\n    // bind 'this' to functions\n    _this.renderImageElement = _this.renderImageElement.bind(_this);\n    _this.onLoad = _this.onLoad.bind(_this);\n    _this.onError = _this.onError.bind(_this);\n    _this.preloadImage = _this.preloadImage.bind(_this);\n    return _this;\n  }\n\n  /**\n   * Called after component mounts to DOM\n   * @returns {undefined} undefined\n   */\n\n\n  _createClass(ResponsiveImageSize, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var _props = this.props,\n          background = _props.background,\n          preloadBackground = _props.preloadBackground;\n\n      if (background && preloadBackground) {\n        this.preloadImage();\n      }\n    }\n\n    /**\n     * Renders component\n     * @returns {ReactElement} React element\n     */\n\n  }, {\n    key: 'render',\n    value: function render() {\n      var background = this.props.background;\n      var loaded = this.state.loaded;\n\n      var imageElement = this.renderImageElement();\n      var backgroundClass = background ? ' background' : '';\n      var loadedClass = loaded ? ' loaded' : '';\n      var className = 'component-responsive-image-size' + backgroundClass + loadedClass;\n\n      return _react2.default.createElement(\n        'div',\n        { className: className },\n        imageElement\n      );\n    }\n\n    /**\n     * Renders Image element\n     * @returns {ReactElement} React element\n     */\n\n  }, {\n    key: 'renderImageElement',\n    value: function renderImageElement() {\n      var element = void 0;\n      var _props2 = this.props,\n          alt = _props2.alt,\n          imageStyle = _props2.imageStyle,\n          children = _props2.children;\n      var imagePath = this.state.imagePath;\n\n\n      if (!this.props.background) {\n        element = _react2.default.createElement('img', {\n          alt: alt,\n          onLoad: this.onLoad,\n          onError: this.onError,\n          src: imagePath,\n          style: imageStyle\n        });\n      } else {\n        var backgroundStyle = {\n          backgroundImage: 'url(' + imagePath + ')'\n        };\n        var propStyle = imageStyle || {};\n        var style = Object.assign({}, propStyle, backgroundStyle);\n\n        element = _react2.default.createElement(\n          'div',\n          { style: style },\n          children\n        );\n      }\n\n      return element;\n    }\n\n    /**\n     * Called when the image is loaded\n     * @param {Event} e - An onLoad event\n     * @returns {undefined} undefined\n     */\n\n  }, {\n    key: 'onLoad',\n    value: function onLoad(e) {\n      if (e.target.getAttribute('src') !== this.placeHolderUrl) {\n        var onLoad = this.props.onLoad;\n\n\n        this.setState({\n          loaded: true,\n          fileWidth: e.target.width,\n          fileHeight: e.target.height\n        });\n\n        if (onLoad) {\n          onLoad();\n        }\n      }\n    }\n\n    /**\n     * Called when image loading failed\n     */\n\n  }, {\n    key: 'onError',\n    value: function onError(e) {\n      var _props3 = this.props,\n          fallbackImage = _props3.fallbackImage,\n          onError = _props3.onError;\n\n\n      if (fallbackImage) {\n        this.setState({\n          imagePath: fallbackImage\n        });\n      }\n\n      if (this.props.onError) {\n        onError(e);\n      }\n    }\n\n    /**\n     * Preloads the image\n     * @returns {ReactElement} React element\n     */\n\n  }, {\n    key: 'preloadImage',\n    value: function preloadImage() {\n      var _this2 = this;\n\n      var path = this.props.path;\n\n      var imageElement = new Image();\n\n      imageElement.onload = function () {\n        _this2.setState({\n          loaded: true,\n          imagePath: path\n        });\n      };\n\n      imageElement.src = path;\n    }\n  }]);\n\n  return ResponsiveImageSize;\n}(_react2.default.Component);\n\n/**\n * Expected propTypes\n * @prop {String} alt - The value for the image alt attribute\n * @prop {Boolean} background - If set to true, the comopnent will render a\n * background image\n * @prop {Array|Object} children - The child elements of the component\n * @prop {Boolean} default - If this is the default size to be loaded, before\n * the window width is available. Mainly used for rendering from the server.\n * @prop {Object} imageStyle - A style object to add to the component\n * @prop {Boolean} lazy - If the component should lazy-load the image\n * @prop {Boolean} loadInitiated - If image has started loading\n * @prop {Boolean} lockSize - If set to true, the component will only load the\n * initial size\n * @prop {Number} minWidth - The minimum width the window should be to load\n * this image\n * @prop {Function} onLoad - A callback to fire when the image is loaded\n * @prop {Object} path - The image path\n * @prop {Boolean} preloadBackground - If the image is a background image,\n * setting this to true will preload it before displaying\n */\n\n\nResponsiveImageSize.propTypes = {\n  alt: _propTypes2.default.string,\n  background: _propTypes2.default.bool,\n  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),\n  default: _propTypes2.default.bool,\n  imageStyle: _propTypes2.default.object,\n  lazy: _propTypes2.default.bool,\n  loadInitiated: _propTypes2.default.bool,\n  minWidth: _propTypes2.default.number.isRequired,\n  onLoad: _propTypes2.default.func,\n  onError: _propTypes2.default.func,\n  path: _propTypes2.default.string.isRequired,\n  preloadBackground: _propTypes2.default.bool,\n  fallbackImage: _propTypes2.default.string\n};\n\nexports.default = ResponsiveImageSize;\n\n//# sourceURL=webpack://ResponsiveImage/./assets/js/src/components/ResponsiveImageSize.jsx?")}])});