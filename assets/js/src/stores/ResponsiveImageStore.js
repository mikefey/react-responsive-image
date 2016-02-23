import events from 'events';
import AppDispatcher from './../dispatcher/AppDispatcher';
import AppConstants from './../constants/AppConstants';

const CHANGE_EVENT = 'change';
const _breakPoints = [
  {
    name: 'small',
    minWidth: 0,
  },
  {
    name: 'medium',
    minWidth: 768,
  },
  {
    name: 'original',
    minWidth: 1024,
  },
];
let _windowSize = {
  width: 0,
  height: 0,
};
let _currentBreakpoint = _breakPoints[0];


/**
 * Calculates the current breakpoint object
 * @returns {undefined} undefined
 */
function _calculateBreakpoint() {
  for (let i = 0; i < _breakPoints.length; i++) {
    const minWidth = _breakPoints[i].minWidth;

    if (_windowSize.width > minWidth) {
      _currentBreakpoint = _breakPoints[i];
    }
  }
}

const ResponsiveImageStore = Object.assign({}, events.EventEmitter.prototype, {
  /**
   * Returns the current breakpoint
   * @returns {String} the current breakpoint
   */
  getState() {
    return {
      currentBreakpoint: _currentBreakpoint,
    };
  },


  /**
   * Emits change event
   * @returns {undefined} undefined
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },


  /**
   * Ads a listener function to the store
   * @param {Function} callback A function to add as a callback
   * @returns {undefined} undefined
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },


  /**
   * Removes a listener function from the store
   * @param {Function} callback A function to remove from the callbacks
   * @returns {undefined} undefined
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },


  /**
   * Listens for events and takes action accordingly
   * @returns {Boolean} true
   */
  dispatcherIndex: AppDispatcher.register((payload) => {
    const action = payload.action;

    switch (action.actionType) {

      case AppConstants.WINDOW_RESIZE:
        _windowSize = {
          width: action.width,
          height: action.height,
        };

        _calculateBreakpoint();

        ResponsiveImageStore.emitChange();
        break;

      default:
        break;
    }

    return true;
  }),
});

module.exports = ResponsiveImageStore;
