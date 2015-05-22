var AppDispatcher = require('./../../dispatcher/AppDispatcher');
var AppConstants = require('./../../constants/AppConstants');
var React = require('react');

var Resizer = React.createClass({
  componentDidMount: function() {
    window.addEventListener('resize', this._handleResize);
    this._handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._handleResize);
  },

  _handleResize:function(e) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.WINDOW_RESIZE,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  },

  render: function(){
    return null;
  }
});

module.exports = Resizer;