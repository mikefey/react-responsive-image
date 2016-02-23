const eventHelper = {
  /**
   * Create a mouseEvent
   * @param {String} ifc - The event interface
   * @param {String} type - The type of event
   * @param {Number} sx - The screenX value of the event
   * @param {Number} sy - The screenY value of the event
   * @param {Number} cx - The clientX value of the event
   * @param {Number} cy - The clientY value of the event
   * @param {Number} kcy - The event keyCode
   * @returns {Object} A mouseEvent object
   */
  createEvent(ifc, type, sx, sy, cx, cy, kc) {
    let evt;
    const e = {
      bubbles: true,
      cancelable: (type !== 'mousemove'),
      view: window,
      detail: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: undefined,
    };

    if (ifc === 'MouseEvents') {
      e.screenX = sx;
      e.screenY = sy;
      e.clientX = cx;
      e.clientY = cy;
    }

    if (ifc === 'KeyboardEvents') {
      e.keyCode = kc;
    }

    if (typeof(document.createEvent) === 'function') {
      evt = document.createEvent(ifc);

      if (ifc === 'MouseEvents') {
        evt.initMouseEvent(type,
          e.bubbles, e.cancelable, e.view, e.detail,
          e.screenX, e.screenY, e.clientX, e.clientY,
          e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
          e.button, document.body.parentNode);
      }

      if (ifc === 'KeyboardEvents') {
        console.log('as;dlfkjas;flkjasld;fjk')
        evt.initEvent(type,
          e.bubbles,
          e.cancelable,
          null,
          false,
          false,
          false,
          false,
          e.keyCode,
          0);
      }

      if (ifc === 'Events') {
        evt.initEvent(type,
          e.bubbles, e.cancelable);
      }
    } else if (document.createEventObject) {
      evt = document.createEventObject();
      for (const prop of e) {
        evt[prop] = e[prop];
      }

      evt.button = { 0: 1, 1: 4, 2: 2 }[evt.button] || evt.button;
    }

    return evt;
  },


  /**
   * Create a mouseEvent
   * @param {HTMLElement} el - The element to dispatch the event from
   * @param {Object} evt - The event to dispatch
   * @returns {Object} A mouseEvent object
   */
  dispatchEvent(el, evt) {
    if (el.dispatchEvent) {
      el.dispatchEvent(evt);
    } else if (el.fireEvent) {
      el.fireEvent('on' + evt, evt);
    }

    return evt;
  },
};

export default eventHelper;
