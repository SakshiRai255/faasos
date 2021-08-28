// Animations
const animation = (e) => {
  var a = document.createElement("div");
  var b = e.target.parentElement;
  b.append(a);
  a.classList = "show"
  setTimeout(function () {
    a.remove();
  }, 1500.9);
}


// Adding items to cart
async function addToCart(id) {
  let food = await useAPI(`http://localhost:8080/foodItems/${id}`);

  if (food != null) {
    food = food["item"];
  }

  if (food) {
    food.id = id;
    food.quantity = 1;
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    if (!cartItems || cartItems.length <= 0) {
      cartItems = [food];
    } else {
      let flag = false;
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == food.name) {
          cartItems[i].quantity++;
          flag = true;
          break;
        }
      }
      if (!flag) {
        cartItems.push(food);
      }
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } else console.log('Not found');
  checkCart();
}

function showWholeProduct(food, id) {
  let item = food;
  item.id = id;
  localStorage.setItem('LiveProduct', JSON.stringify(item));
  window.location.href = '/product';
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
		  <button onclick="animation(event); addToCart('${id}')">Add</button>
		</div>
		<div class="productCustomisable">Customisable</div>
	  </div>
	</div>
  </div>`;
  card.children[0].onclick = function () {
    showWholeProduct(food, id);
  };
  return card;
}

async function displayFood(category) {

  let productArea = document.getElementById('productArea');
  productArea.innerHTML = null; // clearing out all food items

  // All food categories
  let res = await useAPI(`http://localhost:8080/categories`);
  const foodCategories = res.items;


  res = await useAPI(`http://localhost:8080/foodItems`)
  
  const foodItems = res.items;

  for (index in foodCategories) {
    const foodCategory = foodCategories[index]["name"];

    const categoryDiv = document.createElement('div');

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

    const sameCategoryFood = foodItems.filter(item => item["category"]["name"] == foodCategory);
    
      for (let i = 0; i < sameCategoryFood.length; i++) {
        const dish = sameCategoryFood[i];
        // if both - then show
        // else should match category
        if (category == 'both' || dish['veg_nonVeg'] == category) {
          dailyValue.append(createFoodItem(dish, dish["_id"]));
        }

        allProducts.append(dailyValue);
        categoryDiv.append(allProducts);
        productArea.append(categoryDiv);
    }
  }
}

// Product Category List Loaded
async function displayCategories() {
  let productCategoryList = document.getElementById('productCategoryList');

  const allCategory = await useAPI(`http://localhost:8080/categories`);

  for (let i = 0; i < allCategory.items.length; i++) {
    const foodCategory = allCategory.items[i].name;

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
  window.location.href = 'landingPage';
}

displayCategories();
displayFood('both');
