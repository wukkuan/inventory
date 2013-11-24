var PantryItems = EmberFire.ObjectArray.create({
  ref: new Firebase('https://blinventory.firebaseio.com/pantry_items')
});

export default PantryItems;

