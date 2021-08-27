let foodItems = null;

// Close SearchFoodInput
function closeSearchFoodPopUp() {
  const displayFilterItems = document.getElementById('displayFilterItems');
  displayFilterItems.innerHTML = null;

  const searchFoodPopUp = document.getElementById('searchFoodPopUp');
  searchFoodPopUp.style.display = 'none';

  const productSearchInput = document.getElementById("productSearchInput");
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
                    <button onclick="addToCart('${food._id}')">Add</button>
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
  for (index in foodItems) {
      let item = foodItems[index];
      let itemName = item.name.toLowerCase();
      if (itemName.includes(productSearchInput)) filteredFoodItems.push(item);
    }

  let displayFilterItems = document.getElementById('displayFilterItems');
  displayFilterItems.innerHTML = ``;

  for (let i = 0; i < filteredFoodItems.length; i++) {
    let newFoodItem = createSearchFoodCard(filteredFoodItems[i]);
    displayFilterItems.append(newFoodItem);
  }
}

async function openSearchFoodMenu() {
  let searchFoodPopUp = document.getElementById('searchFoodPopUp');
  searchFoodPopUp.style.display = 'block';

  if (!foodItems) {
    const result = await useAPI(`http://localhost:8080/foodItems`);
    foodItems = result["items"]; 
  }

  let productSearchInput = document.getElementById('productSearchInput');
  productSearchInput.addEventListener('input', filterProducts);
}

// openSearchFoodMenu();
