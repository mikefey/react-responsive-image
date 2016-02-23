# react-responsive-image
A React responsive image component.

Displays different image sizes based on the user's window width. Currently supports 3 image sizes, with the 'small' being displayed between 0-767px, 'medium' between 768-1023px, and 'original' at 1025px and above. The 'initialUrl' is the url that will be loaded when the component is mounted. Support for custom sizes is on the to-do list.

## to install
```
npm i react-responsive-image
```

## usage
```
import ResponsiveImage from 'react-responsive-image';

const imageData = {
  initialUrl: 'path-to-initial-image.jpg',
  smallImageUrl: 'path-to-small-image.jpg',
  mediumImageUrl: 'path-to-medium-image.jpg',
  originalImageUrl: 'path-to-large-image.jpg',
};

function onLoad(currentUrl, img, id) {
  // the current url for the image, based on the window size
  console.log('currentUrl: ', currentUrl);
  // the image element
  console.log('img: ', img);
  // the image id prop value
  console.log('id: ', id);
}

<ResponsiveImage
  data={imageData}
  onLoad={onLoad}
/>

```

## props
**background {Boolean}** - If set to true, the comopnent will render a background image  
**className {String}** - An additional className to add to the component  
**data {Object}** - A data object containing image urls for the original, medium, and small images  
**id {String|Number}** - A unique id for the component  
**lazy {Boolean}** - If the component should lazy-load the image  
**lockSize {Boolean}** - If set to true, the component will only load the initial size  
**onLoad {Function}** - A callback to fire when the image is loaded  
**style {Object}** - A style object to add to the component

## methods
**lazyLoad()** - Loads the image, used if the `lazy` prop was set to `true`
