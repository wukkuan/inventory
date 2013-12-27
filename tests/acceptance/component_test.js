var App;

module('Acceptances - Component', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('component output is rendered', function(){
  expect(1);

  visit('/component-test').then(function(){
    ok(true);
  });
});

