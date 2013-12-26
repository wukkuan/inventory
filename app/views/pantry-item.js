import pantryItemTemplate from 'appkit/templates/pantry-item';
import { GestureRecognizer } from 'appkit/views/mixins/gesture-recognizer';

var PantryItemView = Em.View.extend(GestureRecognizer, {
  template: pantryItemTemplate,
  
  swipe: function(xDirection) {
    if (xDirection < 0) {
      this.get('controller').send('decrementQuantity', this.get('item'));
    } else if (xDirection > 0) {
      this.get('controller').send('incrementQuantity', this.get('item'));
    }
  }
});

export default PantryItemView;
