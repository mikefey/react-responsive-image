import Dispatcher from './Dispatcher';


/**
 * App Dispatcher
 * @class
 */
const AppDispatcher = Object.assign({}, Dispatcher.prototype, {
  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction
   * @param {object} action The data coming from the view
   * @returns {undefined} undefined
   */
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action,
    });
  },

});

export default AppDispatcher;
