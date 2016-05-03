import React from 'react';
import ReactDOM from 'react-dom';
import AppDispatcher from './../dispatcher/AppDispatcher';
import AppConstants from './../constants/AppConstants';
import ResponsiveImageStore from './../stores/ResponsiveImageStore';


const ResponsiveImage = React.createClass({
  /**
   * Used by React as the component name
   */
  displayName: 'ResponsiveImage',


  /**
   * Blank 1px X 1px .gif in base64 format
   */
  placeHolderUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',


  /**
   * Expected propTypes
   * @prop {Boolean} background - If set to true, the comopnent will render a
   * background image
   * @prop {Array|Object} children - The child elements of the component
   * @prop {String} className - An additional className to add to the component
   * @prop {Object} data - A data object containing image urls for the original,
   * medium, and small images
   * @prop {String|Number} id - A unique id for the component
   * @prop {Boolean} lazy - If the component should lazy-load the image
   * @prop {Boolean} lockSize - If set to true, the component will only load the
   * initial size
   * @prop {Function} onLoad - A callback to fire when the image is loaded
   * @prop {Object} style - A style object to add to the component
   */
  propTypes: {
    background: React.PropTypes.bool,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    className: React.PropTypes.string,
    data: React.PropTypes.shape({
      initialUrl: React.PropTypes.string.isRequired,
      smallImageUrl: React.PropTypes.string.isRequired,
      mediumImageUrl: React.PropTypes.string.isRequired,
      originalImageUrl: React.PropTypes.string.isRequired,
    }).isRequired,
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    lazy: React.PropTypes.bool,
    lockSize: React.PropTypes.bool,
    onLoad: React.PropTypes.func,
    style: React.PropTypes.object,
  },


  /**
   * Returns initial state object
   * @returns {Object} initial state object
   */
  getInitialState() {
    return {
      currentUrl: this.props.data.initialUrl || this.placeHolderUrl,
      previousSize: 'previousSize',
      currentSize: 'currentSize',
      shouldLoad: !this.props.lazy ? true : false,
      loaded: false,
    };
  },


  /**
   * Called after component mounts to DOM
   * @returns {undefined} undefined
   */
  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);

    if ('orientationchange' in window) {
      window.addEventListener('orientationchange', this._onResize);
    } else {
      window.addEventListener('resize', this._onResize);
    }

    this._onResize();
    ResponsiveImageStore.addChangeListener(this._onChange);

    if (!this.props.lazy) {
      const storeState = ResponsiveImageStore.getState();
      const currentSize = storeState.currentBreakpoint.name;
      const newUrl = this._getImageUrl(currentSize);

      if (!this.props.lockSize) {
        this.setState({
          currentUrl: newUrl,
          currentSize,
        }, function () {
          if (this.props.background) {
            this._preloadImage(this.state.currentUrl);
          }

          // Set the previous image size to equal the
          // current image size
          this.setState({
            previousSize: this.state.currentSize,
          });
        });
      } else {
        this._preloadImage(this.state.currentUrl);
      }
    }
  },


  /**
   * Called before component is removed from the DOM
   * @returns {undefined} undefined
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('orientationchange', this._onResize);
    ResponsiveImageStore.removeChangeListener(this._onChange);
  },


  /**
   * Renders component
   * @returns {Object} React element
   */
  render() {
    const currentUrl = this.props.lazy ? this.placeHolderUrl : this.state.currentUrl;
    const backgroundStyle = { backgroundImage: 'url(' + currentUrl + ')' };
    const style = Object.assign(backgroundStyle, this.props.style);
    const loadedClass = this.state.loaded ? ' loaded' : '';
    const additionalClass = this.props.className ?
      ' ' + this.props.className : '';
    let className = 'component-responsive-image' +
      additionalClass +
      loadedClass;

    if (this.props.background) {
      className += ' background';
    }

    let element;

    if (!this.props.background) {
      element = (
        <img
          onLoad={this._onLoad}
          ref='image'
          style={this.props.style}
          className={className}
          src={currentUrl}
        />
      );
    } else {
      element = (
        <div
          className={className}
          style={style}
        >
          {this.props.children}
        </div>
      );
    }

    return element;
  },


  /**
   * Public method to load the image
   * @returns {undefined} undefined
   */
  lazyLoad() {
    if (this.isMounted()) {
      this.setState({
        shouldLoad: true,
      }, this._onChange);
    }
  },


  /**
   * Preloads an image
   * @param {String} url - The image url
   * @returns {undefined} undefined
   */
  _preloadImage(url) {
    const _this = this;
    const img = new Image();

    img.onload = function () {
      _this._onLoad();
    };

    img.src = url;
  },


  /**
   * Called when the image is loaded
   * @returns {undefined} undefined
   */
  _onLoad() {
    if (this.isMounted()) {
      const currentUrl = this._getImageUrl(this.state.currentSize);

      if (this.isMounted() && currentUrl !== this.state.currentUrl) {
        this.setState({ currentUrl });
      }

      if (this.props.onLoad) {
        const id = this.props.id;
        const img = this.refs.image || null;

        this.props.onLoad(currentUrl, img, id);
      }

      this.setState({ loaded: true });
    }
  },


  /**
   * Called when a 'CHANGE' event is emitted from the ResponsiveImageStore
   * @returns {undefined} undefined
   */
  _onChange() {
    const _this = this;
    const storeState = ResponsiveImageStore.getState();

    if (this.isMounted() && this.state.shouldLoad) {
      // Get the name of the current breakpoint from the
      // ResponsiveImageStore ('desktop', 'mobile', or 'tablet')
      this.setState({
        currentSize: storeState.currentBreakpoint.name,
      }, function () {
        // If the new size does not equal the previous size,
        // Change the image url.

        if (_this.state.currentSize !== _this.state.previousSize &&
          !_this.props.lockSize) {
          _this._preloadImage(_this._getImageUrl(_this.state.currentSize));
        }

        // Set the previous image size to equal the
        // current image size
        this.setState({
          previousSize: this.state.currentSize,
        });
      });
    }
  },


  /**
   * Gets image url based on screen size
   * @param {String} size - The screen size as a string
   * @returns {String} url of image
   */
  _getImageUrl(size) {
    let url;

    url = this.props.data[size + 'ImageUrl'];

    return url;
  },


  /**
   * Called when the browser is resized
   * @returns {undefined} undefined
   */
  _onResize() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.WINDOW_RESIZE,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.windowResized = true;
  },
});

export default ResponsiveImage;
