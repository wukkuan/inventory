import {GestureRecognizer} from 'appkit/views/mixins/gesture-recognizer';

var recognizer;
module("Unit - GestureRecognizerMixin", {
  setup: function(){
    recognizer = Em.View.extend(GestureRecognizer).create();
  }
});

test("it exists", function(){
  ok(recognizer, 'exists');
  ok(GestureRecognizer.detect(recognizer), 'is GestRecognizerMixin');
});

var e = function(x, y) {
  return {
    pageX: x,
    pageY: y,
    screenX: x,
    screenY: y,
    clientX: x,
    clientY: y,
    touches: [],
    changedTouches: [{
      pageX: x,
      pageY: y,
      screenX: x,
      screenY: y,
      clientX: x,
      clientY: y
    }],
  };
};

test("Gesture - Swipe from left to right", function(){
  expect(1);

  recognizer.reopen({
    swipe: function(direction) {
      ok(direction, 1, 'swipe direction should be positive');
    }
  });

  recognizer.touchStart(e(0, 0));
  recognizer.touchMove(e(10, 0));
  recognizer.touchEnd(e(101, 0));
}); 

test("Gesture - Incomplete swipe from left to right", function(){
  expect(0);

  recognizer.reopen({
    swipe: function(direction) {
      ok(direction, 1, 'swipe function should never be called');
    }
  });

  recognizer.touchStart(e(0, 0));
  recognizer.touchMove(e(10, 0));
  recognizer.touchEnd(e(99, 0));
}); 

test("Gesture - Swipe from right to left", function(){
  expect(1);

  recognizer.reopen({
    swipe: function(direction) {
      ok(direction, -1, 'swipe direction should be positive');
    }
  });

  recognizer.touchStart(e(101, 0));
  recognizer.touchMove(e(10, 0));
  recognizer.touchEnd(e(0, 0));
}); 

test("Gesture - Incomplete swipe from right to left", function(){
  expect(0);

  recognizer.reopen({
    swipe: function(direction) {
      ok(direction, 1, 'swipe function should never be called');
    }
  });

  recognizer.touchStart(e(99, 0));
  recognizer.touchMove(e(10, 0));
  recognizer.touchEnd(e(0, 0));
}); 
