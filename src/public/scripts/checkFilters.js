let currentCategory = 'both';

function handleVegNonVeg(myRadio) {
  currentCategory = myRadio.value;
  displayFood(currentCategory);
}
