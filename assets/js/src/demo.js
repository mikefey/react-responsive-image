
import './../../css/src/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveImage from './../../../index.js';

const imageData = {
  initialUrl: 'assets/images/original/building.jpg',
  smallImageUrl: 'assets/images/small/building.jpg',
  mediumImageUrl: 'assets/images/medium/building.jpg',
  originalImageUrl: 'assets/images/original/building.jpg',
};


/**
 * Calls a function when the DOM is ready
 * @param {Function} callback - The function to call
 * @returns {undefined} undefined
 */
function domReady(callback) {
  const doc = document;
  const attach = 'addEventListener';

  if (doc[attach]) {
    doc[attach]('DOMContentLoaded', callback);
  } else {
    window.attachEvent('onload', callback);
  }
}


/**
 * Loads the app
 * @param {Function} callback - The function to call
 * @returns {undefined} undefined
 */
domReady(() => {
  const appContainer = document.getElementsByClassName('app-container')[0];

  ReactDOM.render(
    <div>
      <ResponsiveImage
        data={imageData}
      />
    </div>,
    appContainer
  );
});
