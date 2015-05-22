var AppDispatcher = require('./../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('./../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _windowWidth = 0;
var _windowHeight = 0;
var _currentBreakpoint;
var _breakPoints = [
  {
    name: 'mobile',
    maxWidth: 640
  },
  {
    name: 'tablet',
    maxWidth: 1024
  },
  {
    name: 'desktop',
    maxWidth: 100000
  }
];

function _calculateBreakpoint() {
  for (var i = 0; i < _breakPoints.length; i++) {
    var minWidth;
    var maxWidth = _breakPoints[i].maxWidth
    
    if (i > 0) {
      minWidth = _breakPoints[i - 1].maxWidth;
    } else {
      minWidth = -1;
    }

    if (_windowWidth > minWidth && _windowWidth < maxWidth) {
      _currentBreakpoint = _breakPoints[i];
    }
  }
}

var ResponsiveImageStore = assign({}, EventEmitter.prototype, {
  getBreakPoint: function() {
    return _currentBreakpoint;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.WINDOW_RESIZE:
        _windowWidth = action.windowWidth;
        _windowHeight = action.windowHeight;
        _calculateBreakpoint();
        ResponsiveImageStore.emitChange();
        break;
    }

    return true;
  })
});

module.exports = ResponsiveImageStore;