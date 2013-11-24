import pantryItems from 'appkit/models/pantry_items';

var PantryItemsRoute = Ember.Route.extend({
  model: function() {
    return pantryItems;
  }
});

export default PantryItemsRoute;

