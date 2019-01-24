import React from 'react';
import PropTypes from 'prop-types';

class ResponsiveImage extends React.Component {
  constructor(props) {
    super(props);


    // used by React as the component name
    this.displayName = 'ResponsiveImage';


    // bind 'this' to functions
    this.getInitialSize = this.getInitialSize.bind(this);
    this.onResize = this.onResize.bind(this);
    this.getCurrentSizeClone = this.getCurrentSizeClone.bind(this);
    this.loadImage = this.loadImage.bind(this);


    // initial state object
    this.state = {
      currentImageSize: this.getInitialSize(),
      loadInitiated: false,
      windowSize: {
        width: 0,
        height: 0,
      },
    };
  }


  /**
   * Called after component mounts to DOM
   * @returns {undefined} undefined
   */
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }


  /**
   * Called after component updates, checks to see if the loadImage prop
   * was set to true and loads image accordingly
   * @param {Object} prevProps - The component's props before the update
   * @returns {undefined} undefined
   */
  componentDidUpdate(prevProps) {
    const { loadImage } = this.props;

    if (!prevProps.loadImage && loadImage) {
      this.loadImage();
    }
  }


  /**
   * Called before component is removed from the DOM
   * @returns {undefined} undefined
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }


  /**
   * Renders component
   * @returns {ReactElement} React element
   */
  render() {
    const { className } = this.props;
    const currentSizeClone = this.getCurrentSizeClone();
    const additionalClass = className ?
      ` ${className}` : '';
    const newClassName = `component-responsive-image${additionalClass}`;

    return (
      <div className={newClassName}>
        {currentSizeClone}
      </div>
    );
  }


  /**
   * Gets the initial size
   * @returns {undefined} undefined
   */
  getInitialSize() {
    const { children } = this.props;
    let initialSize;

    for (let i = 0; i < children.length; i++) {
      if (children[i].props.default) {
        initialSize = children[i];
      }
    }

    if (!initialSize) {
      initialSize = children[0];
    }

    return initialSize;
  }


  /**
   * Returns a clone of the current image size with added props
   * @returns {undefined} undefined
   */
  getCurrentSizeClone() {
    const {
      alt,
      background,
      lazy,
      loadImage,
      onLoad,
      preloadBackground,
      imageStyle,
    } = this.props;

    const {
      currentImageSize,
      loadInitiated,
      windowSize,
    } = this.state;

    return React.cloneElement(currentImageSize, {
      alt,
      background,
      key: 'image-size-' + currentImageSize.props.minWidth,
      lazy,
      loadInitiated,
      loadImage,
      onLoad,
      preloadBackground,
      ref: cis => (this.currentImageSize = cis),
      imageStyle,
      windowSize,
    });
  }


  /**
   * Resize handler
   * @returns {undefined} undefined
   */
  onResize() {
    let currentImageSize;
    const { children } = this.props;
    const windowSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    for (let i = 0; i < children.length; i++) {
      const childProps = children[i].props;

      if (windowSize.width >= childProps.minWidth) {
        currentImageSize = children[i];
      }
    }

    this.setState({
      windowSize,
      currentImageSize,
    });
  }

  /**
   * Loads the image, intended as a public method to lazy load the image
   * @returns {undefined} undefined
   */
  loadImage() {
    this.setState({ loadInitiated: true });
    this.currentImageSize.preloadImage();
  }
}


/**
 * Expected propTypes
 * @prop {String} alt - The value for the image alt attribute
 * @prop {Boolean} background - If set to true, the comopnent will render a
 * background image
 * @prop {Array|Object} children - The child elements of the component
 * @prop {String} className - An additional className to add to the component
 * @prop {Object} imageStyle - A style object to add to the component
 * @prop {Boolean} lazy - If the component should lazy-load the image
 * @prop {Function} loadImage - Set to true to load an image, when the lazy prop is set to true
 * @prop {Function} onLoad - A callback to fire when the image is loaded
 * @prop {Boolean} preloadBackground - If the image is a background image,
 * setting this to true will preload it before displaying
 */
ResponsiveImage.propTypes = {
  alt: PropTypes.string,
  background: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  imageStyle: PropTypes.object,
  lazy: PropTypes.bool,
  loadImage: PropTypes.bool,
  onLoad: PropTypes.func,
  preloadBackground: PropTypes.bool,
};

export default ResponsiveImage;
