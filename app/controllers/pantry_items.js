var PantryItemsController = Em.ArrayController.extend({
  actions: {
    incrementQuantity: function(item) {
      item.incrementProperty('quantity', 1);
    },
    decrementQuantity: function(item) {
      if (item.get('quantity') > 0) {
        item.incrementProperty('quantity', -1);
      }
    },
    createNewItem: function(newTitle) {
      if (!Em.isEmpty(newTitle) && Em.isNone(this.findBy('title', newTitle))) {
        this.addObject(Em.Object.create({
          title: newTitle,
          quantity: 1
        }));
        this.set('newTitle', '');
      }
    }
  },

  filteredItems: function() {
    var newTitle = this.get('newTitle');
    if (!Em.isEmpty(newTitle)) {
      return this.filter(function(item) {
        if (item.get('title').indexOf(newTitle) !== -1) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return this.filter(function(item) {
        if (item.get('quantity') > 0) {
          return true;
        }
      });
    }
  }.property('newTitle', '@each', '@each.quantity'),

  sortProperties: ['title'],
  sortAscending: true
});

export default PantryItemsController;


