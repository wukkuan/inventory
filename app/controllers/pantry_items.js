var PantryItemsController = Em.ArrayController.extend({
  actions: {
    incrementQuantity: function(item) {
      item.incrementProperty('quantity', 1);
    },
    decrementQuantity: function(item) {
      item.incrementProperty('quantity', -1);
    },
    createNewItem: function(newTitle) {
      this.addObject({
        title: newTitle,
        quantity: 1
      });
      this.set('newTitle', '');
    }
  },

  sortProperties: ['title'],
  sortAscending: true
});

export default PantryItemsController;


