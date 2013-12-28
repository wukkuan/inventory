var Coordinates = Em.Object.extend({
  x: null,
  y: null
});

Coordinates.reopenClass({
  createFromTouch: function(touch) {
    return this.create({
      x: touch.pageX,
      y: touch.pageY
    });
  },

  toString: function() {
    return '(' + this.get('x') + ', ' + this.get('y') + ')';
  }
});

// Touch events sometimes hide useful data in an originalEvent sub-hash.
function normalizeTouchEvents(event) {
  if (Em.isNone(event.touches)) {
    event.touches = event.originalEvent.touches;
  }
  if (Em.isNone(event.changedTouches)) {
    event.changedTouches = event.originalEvent.changedTouches;
  }
  if (Em.isNone(event.pageX)) {
    event.pageX = event.originalEvent.pageX;
  }
  if (Em.isNone(event.pageY)) {
    event.pageY = event.originalEvent.pageY;
  }
  if (Em.isNone(event.screenX)) {
    event.screenX = event.originalEvent.screenX;
  }
  if (Em.isNone(event.screenY)) {
    event.screenY = event.originalEvent.screenY;
  }
  if (Em.isNone(event.clientX)) {
    event.clientX = event.originalEvent.clientX;
  }
  if (Em.isNone(event.clientY)) {
    event.clientY = event.originalEvent.clientY;
  }

  return event;
}

var GestureRecognizer = Em.Mixin.create({
  touchStart: function(event) {
    event = normalizeTouchEvents(event);

    this.set('startTouch', Coordinates.createFromTouch(event.changedTouches[0]));
    return true;
  },

  touchMove: function(event) {
    event = normalizeTouchEvents(event);
    
    this.set('lastTouch', Coordinates.createFromTouch(event.changedTouches[0]));
    return true;
  },

  touchEnd: function(event) {
    event = normalizeTouchEvents(event);

    this.set('lastTouch', Coordinates.createFromTouch(event.changedTouches[0]));

    var sx = this.get('startTouch.x');
    var sy = this.get('startTouch.y');
    var ex = this.get('lastTouch.x');
    var ey = this.get('lastTouch.y');
    var mx = sx - ex;
    var my = sy - ey;
    var ax = Math.abs(mx);
    var ay = Math.abs(my);

    if (ay < 50) {
      if (mx > 100) {
        if (typeof this.swipe === 'function') {
          this.swipe(-1);
        }
      } else if (mx < -100) {
        if (typeof this.swipe === 'function') {
          this.swipe(1);
        }
      }
    }
  }
});

export {Coordinates, GestureRecognizer};
