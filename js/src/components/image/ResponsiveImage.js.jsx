var React = require('react');
var ResponsiveImageStore = require('./../../stores/ResponsiveImageStore');

var ResponsiveImage = React.createClass({
  getInitialState: function() {
    return {
      currentUrl: this.props.data.initialUrl,
      previousSize: null,
      currentSize: null
    }
  },

  componentDidMount: function() {
    ResponsiveImageStore.addChangeListener(this._onChange);
    this._onChange();
  },

  componentWillUnmount: function() {
    ResponsiveImageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return <img className='responsive-image' src={this.state.currentUrl} />;
  },

  // Called when a 'change' event is emitted from
  // The ResponsiveImageStore.
  _onChange: function() {
    // Get the name of the current breakpoint from the 
    // ResponsiveImageStore ('desktop', 'mobile', or 'tablet')
    this.setState({
      currentSize: ResponsiveImageStore.getBreakPoint().name
    });

    // If the new size does not equal the previous size,
    // Change the image url.
    if (this.state.currentSize != this.state.previousSize) {
      this.setState({
        currentUrl: this._getImageUrl(this.state.currentSize)
      });
    }

    // Set the previous image size to equal the 
    // current image size
    this.setState({
      previousSize: this.state.currentSize
    });
  },

  _getImageUrl: function(size) {
    var url;

    if (size == 'mobile') {
      url = this.props.data.mobileImageUrl;
    } else if (size == 'tablet') {
      url = this.props.data.tabletImageUrl;
    } else if (size == 'desktop') {
      url = this.props.data.desktopImageUrl;
    }

    return url;
  }
});

module.exports = ResponsiveImage;