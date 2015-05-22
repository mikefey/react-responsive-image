var Dispatcher = require('./Dispatcher');
var assign = require('object-assign');

var AppDispatcher = assign({}, Dispatcher.prototype, {

  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;