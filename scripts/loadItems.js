function createFoodItem(food) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<div class="cardImage">
	<img
	  src="${food.img_src}"
	  alt="${food.name}"
	/>
  </div>
  <div class="cardDetails">
	<div class="twoColumn productNamePrice">
	  <h3 class="productName">
	  ${food.name}
	  </h3>
	  <p class="productPrice">
		<img
		  src="./images/${food.veg_nonVeg == 'veg' ? 'vegLogo.svg' : 'nonVegLogo.svg'}"
		  alt=""
		  class="veg_nonVeg"
		/>
		₹ ${food.price}
	  </p>
	</div>
	<div class="oneColumn">
	  <div class="productDescription">
		${food.description}
	  </div>
	</div>
	<div class="twoColumn">
	  <div class="productWrapper">
		<div class="productRating">
		  <i class="fas fa-star"></i>
		  <span>${food.rating}</span>
		</div>
		<div class="productBoughtCount">${food.boughtTimes} bought this</div>
	  </div>
	  <div class="productWrapper">
		<div class="addProduct">
		  <button>Add</button>
		</div>
		<div class="productCustomisable">Customisable</div>
	  </div>
	</div>
  </div>`;
  return card;
}

function displayFood() {
  for (foodCategory in foodItems) {
    console.log(foodCategory);

    let categoryDiv = document.createElement('div');
    switch (foodCategory) {
      case 'Daily Value Wrap Combos (Save Upto 40% Extra)':
        categoryDiv.id = 'dailyValueWrap';
        break;
      case 'Combos for 1 (Save upto 15% Extra)':
        categoryDiv.id = 'combosForOne';
        break;
      case 'Combos for 2 (Save upto 20% Extra)':
        categoryDiv.id = 'combosForTwo';
        break;
      case 'Combos for 4 (Save upto 25% Extra)':
        categoryDiv.id = 'combosForFour';
        break;
      case 'Signature Wraps':
        categoryDiv.id = 'signatureWraps';
        break;
      case 'Classic Wraps':
        categoryDiv.id = 'classicWraps';
        break;
      case 'Rice Bowls':
        categoryDiv.id = 'riceBowls';
        break;
      case 'Sides And Beverages':
        categoryDiv.id = 'sidesAndBeverages';
        break;
      case 'Desserts':
        categoryDiv.id = 'desserts';
        break;
      default:
        break;
    }

    categoryDiv.innerHTML = `<div id="productAreaHeading">
		<p>${foodCategory}</p>
	  </div>`;

    let allProducts = document.createElement('div');
    allProducts.id = 'allProducts';

    let dailyValue = document.createElement('div');
    dailyValue.id = 'dailyValue';

    for (let i = 0; i < foodItems[foodCategory].length; i++) {
      dailyValue.append(createFoodItem(foodItems[foodCategory][i]));
    }

    allProducts.append(dailyValue);
    categoryDiv.append(allProducts);

    let productArea = document.getElementById('productArea');
    productArea.append(categoryDiv);
  }
}

displayFood();
