module.exports = {
  entry: './assets/js/src/index.js',
  output: {
    path: 'assets/js/lib/',
    filename: 'react-responsive-image.build.js',
    libraryTarget: 'umd',
    library: 'ResponsiveImage'
  },
  externals: [{
    'react' : 'react',
    'react-dom' : 'react-dom'
  }],
  devtool: 'eval',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style',
          'css',
          'postcss-loader',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=8192',
          'img'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
        ]
      }
    ]
  }
};
