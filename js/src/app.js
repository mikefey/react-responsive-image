var DomReady = require('domready');
var React = require('react');
var Resizer = require('./components/resizer/Resizer.js.jsx');
var ResponsiveImage = require('./components/image/ResponsiveImage.js.jsx');

var App = {
  init: function() {
    var imgData = {
      initialUrl: 'images/img-desktop.jpg',
      desktopImageUrl: 'images/img-desktop.jpg',
      tabletImageUrl: 'images/img-tablet.jpg',
      mobileImageUrl: 'images/img-mobile.jpg'
    };

    React.render(React.createElement(Resizer), document.getElementById('resizer'));
    React.render(React.createElement(ResponsiveImage, {data: imgData}), document.getElementById('responsive-image-wrapper'));
  }
};

DomReady(function () {
  App.init();
});

module.exports = App;