
import './../../css/src/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveImage from './components/ResponsiveImage.jsx';
import ResponsiveImageSize from './components/ResponsiveImageSize.jsx';

class DemoApp extends React.Component {
  render() {
    return (
      <div className='component-demo-app'>
        <ResponsiveImage
          alt={'Image alt text'}
          imageStyle={{ width: '100%' }}
        >
          <ResponsiveImageSize
            default
            minWidth={0}
            path={'assets/images/small/building.jpg'}
          />
          <ResponsiveImageSize
            minWidth={768}
            path={'assets/images/medium/building.jpg'}
          />
          <ResponsiveImageSize
            minWidth={1100}
            path={'assets/images/original/building.jpg'}
          />
        </ResponsiveImage>
      </div>
    );
  }
}


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

  ReactDOM.render(<DemoApp />, appContainer);
});
