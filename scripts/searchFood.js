// Close SearchFoodInput
function closeSearchFoodPopUp() {
  let displayFilterItems = document.getElementById('displayFilterItems');
  displayFilterItems.innerHTML = null;

  let searchFoodPopUp = document.getElementById('searchFoodPopUp');
  searchFoodPopUp.style.display = 'none';

  let productSearchInput = document.getElementById("productSearchInput");
  productSearchInput.value = null;

}

// Create Search Food Card
function createSearchFoodCard(food) {
  let div = document.createElement('div');
  div.classList.add('searchFoodCard');
  div.innerHTML = `
                <img
                  class="searchFoodCardImage"
                  src="${food['img_src']}"
                  alt=""
                />
                <div class="searchFoodDetails">
                  <div class="searchFoodUpper">
                    <a href="">${food.name}</a>
                    <span
                      ><img src="../images/${
                        food['veg_nonVeg'] == 'veg'
                          ? 'vegLogo.svg'
                          : 'nonVegLogo.svg'
                      }" alt="" /><span
                        class="searchFoodPrice"
                        >₹ ${food.price}</span
                      ></span
                    >
                  </div>
                  <div class="searchFoodDescription">
                    <p>${food.description}</p>
                    <span>Read more</span>
                  </div>
                  <div class="searchFoodAddButton">
                    <button onclick="addToCart(${food.id})">Add</button>
                  </div>
                </div>
              `;
  return div;
}

// Filter products on keypress
function filterProducts() {
  let productSearchInput = document
    .getElementById('productSearchInput')
    .value.toLowerCase();

  if (!productSearchInput && productSearchInput.length <= 0) return;

  let filteredFoodItems = [];
  let id = 0;
  for (category in foodItems) {
    for (let i = 0; i < foodItems[category].length; i++) {
      let item = foodItems[category][i];
      item.id = id++;
      item.quantity = 0;
      let itemName = item.name.toLowerCase();
      if (itemName.includes(productSearchInput)) filteredFoodItems.push(item);
    }
  }

  let displayFilterItems = document.getElementById('displayFilterItems');
  displayFilterItems.innerHTML = ``;

  for (let i = 0; i < filteredFoodItems.length; i++) {
    let newFoodItem = createSearchFoodCard(filteredFoodItems[i]);
    displayFilterItems.append(newFoodItem);
  }
}

function openSearchFoodMenu() {
  let searchFoodPopUp = document.getElementById('searchFoodPopUp');
  searchFoodPopUp.style.display = 'block';

  let productSearchInput = document.getElementById('productSearchInput');
  productSearchInput.addEventListener('input', filterProducts);
}

// openSearchFoodMenu();
