import PantryItemsController from 'appkit/controllers/pantry_items';

var controller;
module("Unit - PantryItemsController", {
  setup: function(){
    var container = isolatedContainer([
      'controller:pantry-items'
    ]);

    controller = container.lookup('controller:pantry-items');
  }
});

test("it exists", function(){
  ok(controller);
  ok(controller instanceof PantryItemsController);
});

test("action - incrementQuantity", function(){
  equal(controller.get('length'), 0, 'length should be 0 initially');

  var item0 = Em.Object.create({
    quantity: 0,
    title: 'initial title'
  });

  controller.pushObject(item0);
  equal(controller.get('length'), 1,
        'length should be 1 after pushing an item');

  equal(controller.objectAt(0), item0,
        'item0 should be the same item that is inside the controller');

  equal(item0.get('quantity'), 0, 'initial quantity should be 0');
  controller.send('incrementQuantity', item0);
  equal(item0.get('quantity'), 1,
        'quantity should be 1 after incrementQuantity');
});

test("action - decrementQuantity", function(){
  equal(controller.get('length'), 0, 'length should be 0 initially');

  var item0 = Em.Object.create({
    quantity: 0,
    title: 'initial title'
  });

  controller.pushObject(item0);
  equal(controller.get('length'), 1,
        'length should be 1 after pushing an item');

  equal(controller.objectAt(0), item0,
        'item0 should be the same item that is inside the controller');

  equal(item0.get('quantity'), 0, 'initial quantity should be 0');
  controller.send('decrementQuantity', item0);
  equal(item0.get('quantity'), 0,
        'quantity should remain 0 after decrementing as we cannot go below 0');

  item0.set('quantity', 1);
  equal(item0.get('quantity'), 1, 'initial quantity should be 1');
  controller.send('decrementQuantity', item0);
  equal(item0.get('quantity'), 0, 'quantity should be 0 after decrementing');
});

test("action - createNewItem", function(){
  equal(controller.get('length'), 0, 'length should be 0 initially');

  var title = 'test title';
  controller.send('createNewItem', title);
  equal(controller.get('length'), 1, 'length should be 1 after createNewItem');

  var insertedItem = controller.objectAt(0);
  ok(insertedItem);
  equal(Em.get(insertedItem, 'title'), title,
        'title should be set to title passed in as argument');
  equal(Em.get(insertedItem, 'quantity'), 1, 'default quantity should be 1');
}); 

test("Property - filteredItems", function() {
  var item0 = Em.Object.create({
    quantity: 0,
    title: 'title'
  });
  var item1 = Em.Object.create({
    quantity: 1,
    title: 'TiTlE'
  });
  var item2 = Em.Object.create({
    quantity: 0,
    title: 'something different'
  });

  controller.pushObjects([item0, item1, item2]);
  equal(controller.get('length'), 3,
        'length should be 3 after pushing an item');

   var arrayEquals = function(arr1, arr2) {
    var containsAll = true;

    if (arr1.get('length') !== arr2.get('length')) {
      return false;
    }

    return !arr1.find(function(item) {
      return !arr2.contains(item);
    });
  };

  controller.set('newTitle', null);
  ok(arrayEquals(controller.get('filteredItems'), [item1]),
     'should only contain items that have non-zero quantities');

  controller.set('newTitle', 'titl');
  ok(arrayEquals(controller.get('filteredItems'), [item0, item1]),
     'should contain items with title ignoring case, but no others');

  controller.set('newTitle', 'RANDOM NONSENSE');
  ok(arrayEquals(controller.get('filteredItems'), []),
     'should be empty');
});