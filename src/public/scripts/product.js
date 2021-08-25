function displayProduct() {
  let item = JSON.parse(localStorage.getItem('LiveProduct'));
  if (!item) {
    window.location.href = '/collections';
  }
  let productDetailContact = document.getElementById('productDetailContact');

  let first = `<div id="productDetailContainer">
	<div id="productDetailBreadcrumb">
	  <a href="/landingPage">Home</a>
	  <a href="/collections">Collections</a>
	  <a href="#">${item.name}</a>
	</div>
	<div id="productDetails">
	  <div id="productDetailImage">
		<img
		  src="${item['img_src']}"
		  alt="${item['img_src']}"
		  class=""
		/>
	  </div>
	  <div id="productDetailContent">
		<div id="productDetailContent1">
		  <div>
			<h2>${item.name}</h2>
			<span><img src="/images/${
        item.veg_nonVeg == 'veg' ? 'vegLogo.svg' : 'nonVegLogo.svg'
      }" alt="" /> ₹ ${item.price}</span>
		  </div>
		  <div>
			<div id="ratingAndBought">
			  <span><i class="fas fa-star"></i> 5</span>
			  <p>${item['boughtTimes']} bought this</p>
			</div>
			<div id="addToCart">
			  <button id="addButton" onclick="addToCart(${item.id})">ADD</button>
			  <span>Customizable</span>
			</div>
		  </div>
		</div>
		<div class="hr"></div>
		<div id="productDescription">
		  <p>
		  ${item.description}
		  </p>
		</div>
		<div id="productTags">
		  <h3>Tags</h3>
		  <ul id="productTagList">`;
  let str = '';
  for (let i = 0; i < item.tags.length; i++) {
    let li = `<li>${item.tags[i]}</li>`;
    str += li;
  }
  let last = `</ul>
		</div>
	  </div>
	</div>
	<a href="/checkOut" id="proceedToCheckout">Proceed to checkout</a>
  </div>`;

  productDetailContact.innerHTML = first + str + last;
}

displayProduct();

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

  let proceedToCheckout = document.getElementById('proceedToCheckout');
  proceedToCheckout.style.display = 'block';
}
