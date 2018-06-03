# react-responsive-image
A React responsive image component.

Displays different image sizes based on the user's window width. Can support an unlimited number of image sizes.

## to install
```
npm i react-responsive-image
```

## to run demo
```
npm start
```
Then navigate to [http://localhost:3000/demo.html](http://localhost:3000/demo.html)

## to run tests
```
npm test
```

## to build
```
npm run build
```

## usage
```
import React from 'react';
import ReactDOM from 'react-dom';
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';

<ResponsiveImage>
  <ResponsiveImageSize
    default
    minWidth={0}
    path={'path-to-small-image.jpg'}
  />
  <ResponsiveImageSize
    minWidth={768}
    path={'path-to-medium-image.jpg'}
  />
  <ResponsiveImageSize
    minWidth={1100}
    path={'path-to-large-image.jpg'}
  />
</ResponsiveImage>

```

## props for ResponsiveImage component
**alt {String}** - The value for the image alt attribute  
**background {Boolean}** - If set to true, the component will render a background image  
**className {String}** - An additional className to add to the component     
**lazy {Boolean}** - If the component should lazy-load the image  
**loadImage {Function}** - Set to `true` to load an image, if the `lazy` prop is set to `true`  
**onLoad {Function}** - A callback to fire when the image is loaded  
**style {Object}** - A style object to add to the component 

## props for ResponsiveImageSize component
**default {Boolean}** - If this is the default size to be loaded, before the window width is available. Mainly used for rendering from the server.  
**minWidth {Number}** - The minimum width the window should be to load this image  
**path {Object}** - The image path
