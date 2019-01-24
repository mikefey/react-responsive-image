import React from 'react';
import PropTypes from 'prop-types';

class ResponsiveImageSize extends React.Component {
  constructor(props) {
    super(props);

    const { preloadBackground, lazy, loadInitiated, background, path } = this.props;

    // used by React as the component name
    this.displayName = 'ResponsiveImageSize';

    // blank 1px X 1px .gif in base64 format
    this.placeHolderUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///' +
      'yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    // initial state object
    this.state = {
      imagePath: (preloadBackground || (lazy && !loadInitiated)) ?
        this.placeHolderUrl : path,
      loaded: (background && !preloadBackground),
      fileWidth: 0,
      fileHeight: 0,
    };


    // bind 'this' to functions
    this.renderImageElement = this.renderImageElement.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
    this.preloadImage = this.preloadImage.bind(this);
  }


  /**
   * Called after component mounts to DOM
   * @returns {undefined} undefined
   */
  componentDidMount() {
    const { background, preloadBackground } = this.props;
    if (background && preloadBackground) {
      this.preloadImage();
    }
  }


  /**
   * Renders component
   * @returns {ReactElement} React element
   */
  render() {
    const { background } = this.props;
    const { loaded } = this.state;
    const imageElement = this.renderImageElement();
    const backgroundClass = background ? ' background' : '';
    const loadedClass = loaded ? ' loaded' : '';
    const className = 'component-responsive-image-size' +
      backgroundClass +
      loadedClass;

    return (
      <div className={className}>
        {imageElement}
      </div>
    );
  }


  /**
   * Renders Image element
   * @returns {ReactElement} React element
   */
  renderImageElement() {
    let element;
    const { alt, imageStyle, children } = this.props;
    const { imagePath } = this.state;

    if (!this.props.background) {
      element = (
        <img
          alt={alt}
          onLoad={this.onLoad}
          onError={this.onError}
          src={imagePath}
          style={imageStyle}
        />
      );
    } else {
      const backgroundStyle = {
        backgroundImage: 'url(' + imagePath + ')',
      };
      const propStyle = imageStyle || {};
      const style = Object.assign({}, propStyle, backgroundStyle);

      element = (
        <div style={style}>
          {children}
        </div>
      );
    }

    return element;
  }


  /**
   * Called when the image is loaded
   * @param {Event} e - An onLoad event
   * @returns {undefined} undefined
   */
  onLoad(e) {
    if (e.target.getAttribute('src') !== this.placeHolderUrl) {
      const { onLoad } = this.props;

      this.setState({
        loaded: true,
        fileWidth: e.target.width,
        fileHeight: e.target.height,
      });

      if (onLoad) {
        onLoad();
      }
    }
  }


  /**
   * Called when image loading failed
   */
  onError(e) {
    const { fallbackImage, onError } = this.props;

    if (fallbackImage) {
      this.setState({
        imagePath: fallbackImage,
      });
    }

    if (this.props.onError) {
      onError(e);
    }
  }


  /**
   * Preloads the image
   * @returns {ReactElement} React element
   */
  preloadImage() {
    const { path } = this.props;
    const imageElement = new Image();

    imageElement.onload = () => {
      this.setState({
        loaded: true,
        imagePath: path,
      });
    };

    imageElement.src = path;
  }
}


/**
 * Expected propTypes
 * @prop {String} alt - The value for the image alt attribute
 * @prop {Boolean} background - If set to true, the comopnent will render a
 * background image
 * @prop {Array|Object} children - The child elements of the component
 * @prop {Boolean} default - If this is the default size to be loaded, before
 * the window width is available. Mainly used for rendering from the server.
 * @prop {Object} imageStyle - A style object to add to the component
 * @prop {Boolean} lazy - If the component should lazy-load the image
 * @prop {Boolean} loadInitiated - If image has started loading
 * @prop {Boolean} lockSize - If set to true, the component will only load the
 * initial size
 * @prop {Number} minWidth - The minimum width the window should be to load
 * this image
 * @prop {Function} onLoad - A callback to fire when the image is loaded
 * @prop {Object} path - The image path
 * @prop {Boolean} preloadBackground - If the image is a background image,
 * setting this to true will preload it before displaying
 */
ResponsiveImageSize.propTypes = {
  alt: PropTypes.string,
  background: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  default: PropTypes.bool,
  imageStyle: PropTypes.object,
  lazy: PropTypes.bool,
  loadInitiated: PropTypes.bool,
  minWidth: PropTypes.number.isRequired,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  path: PropTypes.string.isRequired,
  preloadBackground: PropTypes.bool,
  fallbackImage: PropTypes.string,
};


export default ResponsiveImageSize;
