import React from 'react';

class ResponsiveImageSize extends React.Component {
  constructor(props) {
    super(props);


    // used by React as the component name
    this.displayName = 'ResponsiveImageSize';


    // blank 1px X 1px .gif in base64 format
    this.placeHolderUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///' +
      'yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';


    // initial state object
    this.state = {
      imagePath: (this.props.preloadBackground || this.props.lazy) ?
        this.placeHolderUrl : this.props.path,
      loaded: (this.props.background && !this.props.preloadBackground) ? true :
        false,
      fileWidth: 0,
      fileHeight: 0,
    };


    // bind functions to component
    this.renderImageElement = this.renderImageElement.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.preloadImage = this.preloadImage.bind(this);
  }


  /**
   * Called after component mounts to DOM
   * @returns {undefined} undefined
   */
  componentDidMount() {
    if (this.props.background && this.props.preloadBackground) {
      this.preloadImage();
    }
  }


  /**
   * Renders component
   * @returns {ReactElement} React element
   */
  render() {
    const imageElement = this.renderImageElement();
    const backgroundClass = this.props.background ? ' background' : '';
    const loadedClass = this.state.loaded ? ' loaded' : '';
    const className = 'component-responsive-image-size' +
      backgroundClass +
      loadedClass;

    return (<div className={className}>
      {imageElement}
    </div>);
  }


  /**
   * Renders Image element
   * @returns {ReactElement} React element
   */
  renderImageElement() {
    let element;

    if (!this.props.background) {
      element = (
        <img
          alt={this.props.alt}
          onLoad={this.onLoad}
          ref='image'
          src={this.state.imagePath}
        />
      );
    } else {
      const backgroundStyle = {
        backgroundImage: 'url(' + this.state.imagePath + ')',
      };

      element = (
        <div style={backgroundStyle} >
          {this.props.children}
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
      this.setState({
        loaded: true,
        fileWidth: e.target.width,
        fileHeight: e.target.height,
      });

      if (this.props.onLoad) {
        this.props.onLoad();
      }
    }
  }


  /**
   * Preloads the image
   * @returns {ReactElement} React element
   */
  preloadImage() {
    const imageElement = new Image();

    imageElement.onload = () => {
      this.setState({
        loaded: true,
        imagePath: this.props.path,
      });
    };

    imageElement.src = this.props.path;
  }
}


/**
 * Expected propTypes
 * @prop {String} alt - The value for the image alt attribute
 * @prop {Boolean} background - If set to true, the comopnent will render a
 * background image
 * @prop {Array|Object} children - The child elements of the component
 * @prop {Boolean} lazy - If the component should lazy-load the image
 * @prop {Boolean} lockSize - If set to true, the component will only load the
 * initial size
 * @prop {Function} onLoad - A callback to fire when the image is loaded
 * @prop {Object} path - The image path
 * @prop {Boolean} preloadBackground - If the image is a background image,
 * setting this to true will preload it before displaying
 */
ResponsiveImageSize.propTypes = {
  alt: React.PropTypes.string,
  background: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  lazy: React.PropTypes.bool,
  onLoad: React.PropTypes.func,
  path: React.PropTypes.string,
  preloadBackground: React.PropTypes.bool,
};


export default ResponsiveImageSize;
