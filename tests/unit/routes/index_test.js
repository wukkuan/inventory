import Index from 'appkit/routes/index';

var route;
module("Unit - IndexRoute", {
  setup: function(){
    var container = isolatedContainer([
      'route:index'
    ]);

    route = container.lookup('route:index');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Index);
});

// test("#model", function(){
//   var model = route.model();

//   ok(model);
// });
