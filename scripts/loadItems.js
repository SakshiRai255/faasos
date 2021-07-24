// Adding items to cart
function addToCart(id) {
  // let selectedFood = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
  // let selectedFoodPath = e["path"][5];
  // console.log(selectedFoodPath);

  let findId = 0;
  let food = null;
  for (productCategory in foodItems) {
    let found = false;
    let list = foodItems[productCategory];
    for (let i = 0; i < list.length; i++) {
      if (findId == id) {
        food = { ...list[i] };
        found = true;
        break;
      }
      findId++;
    }
    if (found) break;
  }

  if (food) {
    food.id = id;
    food.quantity = 1;
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems) {
      cartItems.push(food);
    } else {
      cartItems = [food];
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } else console.log('Not found');
  checkCart();
}

function createFoodItem(food, id) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = id;
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
		  src="../images/${food.veg_nonVeg == 'veg' ? 'vegLogo.svg' : 'nonVegLogo.svg'}"
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
		  <button onclick="addToCart(${id})">Add</button>
		</div>
		<div class="productCustomisable">Customisable</div>
	  </div>
	</div>
  </div>`;
  return card;
}

function displayFood(category) {
  // console.log('category:', category);

  let productArea = document.getElementById('productArea');
  productArea.innerHTML = null; // clearing out all food items

  let ids = 0; // keeping id for each card
  for (foodCategory in foodItems) {
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
      let dish = foodItems[foodCategory][i];
      // if both - then show
      // else should match category
      if (category == 'both' || dish['veg_nonVeg'] == category) {
        dailyValue.append(createFoodItem(dish, ids));
      }
      ids++;
    }

    allProducts.append(dailyValue);
    categoryDiv.append(allProducts);
    productArea.append(categoryDiv);
  }
}

// Product Category List Loaded
function displayCategories() {
  let productCategoryList = document.getElementById('productCategoryList');

  for (foodCategory in foodItems) {
    let li = document.createElement('li');
    if (foodCategory == 'Daily Value Wrap Combos (Save Upto 40% Extra)') {
      li.classList.add('active');
    }
    let a = document.createElement('a');

    a.classList.add('categoryAnchor');
    switch (foodCategory) {
      case 'Daily Value Wrap Combos (Save Upto 40% Extra)':
        a.href = '#dailyValueWrap';
        break;
      case 'Combos for 1 (Save upto 15% Extra)':
        a.href = '#combosForOne';
        break;
      case 'Combos for 2 (Save upto 20% Extra)':
        a.href = '#combosForTwo';
        break;
      case 'Combos for 4 (Save upto 25% Extra)':
        a.href = '#combosForFour';
        break;
      case 'Signature Wraps':
        a.href = '#signatureWraps';
        break;
      case 'Classic Wraps':
        a.href = '#classicWraps';
        break;
      case 'Rice Bowls':
        a.href = '#riceBowls';
        break;
      case 'Sides And Beverages':
        a.href = '#sidesAndBeverages';
        break;
      case 'Desserts':
        a.href = '#desserts';
        break;
      default:
        break;
    }

    a.innerText = foodCategory;

    li.append(a);
    productCategoryList.append(li);
  }

  // Adding event listener to scroll to specific section
  let lis = productCategoryList.children;
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', function () {
      for (let j = 0; j < lis.length; j++) {
        lis[j].classList.remove('active');
      }
      lis[i].classList.add('active');
    });
  }
}

let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
if (!loggedUser) {
  window.location.href = './landingPage.html';
}

displayCategories();
displayFood('both');
