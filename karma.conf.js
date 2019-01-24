// Karma configuration
// Generated on Tue Feb 02 2016 16:16:23 GMT-0500 (EST)

module.exports = function (config) {
  config.set({
    plugins: [
      /* eslint-disable global-require */
      require('karma-webpack'),
      require('karma-tap'),
      require('karma-es6-shim'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader'),
      /* eslint-enable global-require */
    ],

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['tap', 'es6-shim'],

    // list of files / patterns to load in the browser
    files: [
      '__test__/tests.bundle.js',
      {
        pattern: 'assets/images/**/*.jpg',
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },
    ],

    proxies: {
      '/assets/images': '/base/assets/images',
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '__test__/tests.bundle.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',
      node: {
        fs: 'empty',
      },
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: [
              'babel-loader?presets[]=stage-0,presets[]=react,presets[]=es2015',
            ],
          },
        ],
      },
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN
    //    || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
