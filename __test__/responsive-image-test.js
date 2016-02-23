import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import eventHelper from '../assets/js/src/helpers/event';
import ResponsiveImage from '../assets/js/src/components/ResponsiveImage.jsx';

const host = window.location.host;
const imageData = {
  initialUrl: 'http://' + host + '/assets/images/original/building.jpg',
  smallImageUrl: 'http://' + host + '/assets/images/small/building.jpg',
  mediumImageUrl: 'http://' + host + '/assets/images/medium/building.jpg',
  originalImageUrl: 'http://' + host + '/assets/images/original/building.jpg',
};


test('ResponsiveImage component: Should return an object ', (assert) => {
  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      data={imageData}
    />
  );

  assert.equal(typeof component, 'object');
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should render a background image', (assert) => {
  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      background
      data={imageData}
    />
  );

  const node = ReactDOM.findDOMNode(component);
  const nodeStyle = node.getAttribute('style');

  window.innerWidth = 400;

  const resizeEvent =
    eventHelper.createEvent('Events', 'resize', 0, 0, 0, 0);
  eventHelper.dispatchEvent(window, resizeEvent);

  assert.equal(nodeStyle.indexOf('background-image'), 0);
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should add an additional class ', (assert) => {
  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      className={'additional-class'}
      data={imageData}
    />
  );

  const node = ReactDOM.findDOMNode(component);
  const nodeClass = node.getAttribute('class');

  assert.equal(nodeClass, 'component-responsive-image additional-class');
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should add an additional class to a' +
  'background image', (assert) => {
  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      background
      className={'additional-class'}
      data={imageData}
    />
  );

  const node = ReactDOM.findDOMNode(component);
  const nodeClass = node.getAttribute('class');

  assert.equal(nodeClass, 'component-responsive-image additional-class background');
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should load the medium size image if the ' +
  'browser width is greater than 768px ', (assert) => {
  window.innerWidth = 769;

  const resizeEvent =
    eventHelper.createEvent('Events', 'resize', 0, 0, 0, 0);
  eventHelper.dispatchEvent(window, resizeEvent);

  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      data={imageData}
    />
  );

  assert.equal(component.state.currentUrl, imageData.mediumImageUrl);
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should load the original size image if the ' +
  'browser width is greater than 1024px ', (assert) => {
  window.innerWidth = 1025;

  const resizeEvent =
    eventHelper.createEvent('Events', 'resize', 0, 0, 0, 0);
  eventHelper.dispatchEvent(window, resizeEvent);

  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      data={imageData}
    />
  );

  assert.equal(component.state.currentUrl, imageData.originalImageUrl);
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should fire the onLoad callback with the ' +
  'correct params', (assert) => {
  const imageId = 'an-id';
  let callCount = 0;
  window.innerWidth = 400;

  const resizeEvent =
    eventHelper.createEvent('Events', 'resize', 0, 0, 0, 0);
  eventHelper.dispatchEvent(window, resizeEvent);

  function loadCallback(currentUrl, img, id) {
    callCount++;

    // there will be 2 callbacks fired, one for the initial image and another
    // because a new image is loaded when the window is resized
    if (callCount === 1) {
      assert.equal(currentUrl, imageData.smallImageUrl);
      assert.equal(typeof img, 'object');
      assert.equal(id, imageId);
      ReactDOM.unmountComponentAtNode(document);
      assert.end();
    }
  }

  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      id={imageId}
      onLoad={loadCallback}
      data={imageData}
    />
  );
});


test('ResponsiveImage component: Should load the placeholder image if the ' +
  'lazy prop is true ', (assert) => {
  window.innerWidth = 1025;

  const resizeEvent =
    eventHelper.createEvent('Events', 'resize', 0, 0, 0, 0);
  eventHelper.dispatchEvent(window, resizeEvent);

  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      lazy
      data={imageData}
    />
  );

  const imageSrc = ReactDOM.findDOMNode(component).getAttribute('src');

  assert.equal(imageSrc, component.placeHolderUrl);
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should load the the proper image if the ' +
  'lazy prop is true and lazyLoad() is called', (assert) => {
  window.innerWidth = 1025;

  const resizeEvent =
    eventHelper.createEvent('Events', 'resize', 0, 0, 0, 0);
  eventHelper.dispatchEvent(window, resizeEvent);

  function loadCallback(currentUrl) {
    assert.equal(currentUrl, imageData.originalImageUrl);
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  }

  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      lazy
      onLoad={loadCallback}
      data={imageData}
    />
  );

  component.lazyLoad();
});


test('ResponsiveImage component: Should not load other sizes if the lockSize ' +
  'prop is true ', (assert) => {
  window.innerWidth = 700;

  const resizeEvent =
    eventHelper.createEvent('Events', 'resize', 0, 0, 0, 0);
  eventHelper.dispatchEvent(window, resizeEvent);

  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      lockSize
      data={imageData}
    />
  );

  const imageSrc = ReactDOM.findDOMNode(component).getAttribute('src');

  assert.equal(imageSrc, imageData.initialUrl);
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should add style ', (assert) => {
  const newStyle = {
    left: '10px',
  };

  const component = ReactTestUtils.renderIntoDocument(
    <ResponsiveImage
      style={newStyle}
      data={imageData}
    />
  );

  const node = ReactDOM.findDOMNode(component);
  const nodeStyle = node.getAttribute('style');

  assert.equal(nodeStyle, 'left:10px;');
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('ResponsiveImage component: Should add style to background image element',
  (assert) => {
    const newStyle = {
      left: '10px',
    };

    const component = ReactTestUtils.renderIntoDocument(
      <ResponsiveImage
        background
        style={newStyle}
        data={imageData}
      />
    );

    const node = ReactDOM.findDOMNode(component);
    const nodeStyle = node.getAttribute('style');

    assert.equal(nodeStyle, 'background-image: url(' +
      imageData.smallImageUrl + '); left: 10px;');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });
