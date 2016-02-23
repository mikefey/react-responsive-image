const _callbacks = [];
const Dispatcher = function dispatcher() {};
let _promises = [];

/**
 * Dispatcher
 * @class
 */
Dispatcher.prototype = Object.assign({}, Dispatcher.prototype, {
  /**
   * Register a Store's callback so that it may be invoked by an action.
   * @param {function} callback The callback to be registered.
   * @return {number} The index of the callback within the _callbacks array.
   */
  register(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1; // index
  },

  /**
   * dispatch
   * @param  {object} payload The data from the action.
   * @return {undefined} undefined
   */
  dispatch(payload) {
    // First create array of promises for callbacks to reference.
    const resolves = [];
    const rejects = [];

    _promises = _callbacks.map(function mapPromises(_, i) {
      return new Promise(function (resolve, reject) {
        resolves[i] = resolve;
        rejects[i] = reject;
      });
    });

    // Dispatch to callbacks and resolve/reject promises.
    _callbacks.forEach(function resolveCallbackPromises(callback, i) {
      // Callback can return an obj, to resolve, or a promise, to chain.
      // See waitFor() for why this might be useful.
      Promise.resolve(callback(payload)).then(function () {
        resolves[i](payload);
      }, function () {
        rejects[i](new Error('Dispatcher callback unsuccessful'));
      });
    });

    _promises = [];
  },
});

export default Dispatcher;
