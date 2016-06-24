import React from 'react';

class ResponsiveImage extends React.Component {
  constructor(props) {
    super(props);


    // used by React as the component name
    this.displayName = 'ResponsiveImage';


    // initial state object
    this.state = {
      currentImageSize: this.getInitialSize(),
      windowSize: {
        width: 0,
        height: 0,
      },
    };


    // bind functions to component
    this.onResize = this.onResize.bind(this);
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
    const currentSizeClone = this.getCurrentSizeClone();
    const additionalClass = this.props.className ?
      ' ' + this.props.className : '';
    const className = 'component-responsive-image' + additionalClass;

    return (<div className={className}>
      {currentSizeClone}
    </div>);
  }


  /**
   * Gets the initial size
   * @returns {undefined} undefined
   */
  getInitialSize() {
    let initialSize;

    for (let i = 0; i < this.props.children.length; i++) {
      if (this.props.children[i].props.default) {
        initialSize = this.props.children[i];
      }
    }

    if (!initialSize) {
      initialSize = this.props.children[0];
    }

    return initialSize;
  }


  /**
   * Returns a clone of the current image size with added props
   * @returns {undefined} undefined
   */
  getCurrentSizeClone() {
    return React.cloneElement(this.state.currentImageSize, {
      alt: this.props.alt,
      background: this.props.background,
      key: 'image-size-' + this.state.currentImageSize.props.minWidth,
      lazy: this.props.lazy,
      onLoad: this.props.onLoad,
      preloadBackground: this.props.preloadBackground,
      ref: 'currentImageSize',
      imageStyle: this.props.imageStyle,
      windowSize: this.state.windowSize,
    });
  }


  /**
   * Resize handler
   * @returns {undefined} undefined
   */
  onResize() {
    let currentImageSize;

    const windowSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    for (let i = 0; i < this.props.children.length; i++) {
      const childProps = this.props.children[i].props;

      if (windowSize.width >= childProps.minWidth) {
        currentImageSize = this.props.children[i];
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
    this.refs.currentImageSize.preloadImage();
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
 * @prop {Function} onLoad - A callback to fire when the image is loaded
 * @prop {Boolean} preloadBackground - If the image is a background image,
 * setting this to true will preload it before displaying
 */
ResponsiveImage.propTypes = {
  alt: React.PropTypes.string,
  background: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  className: React.PropTypes.string,
  imageStyle: React.PropTypes.object,
  lazy: React.PropTypes.bool,
  onLoad: React.PropTypes.func,
  preloadBackground: React.PropTypes.bool,
};

export default ResponsiveImage;
