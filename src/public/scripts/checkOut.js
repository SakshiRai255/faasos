function disableDelivery() {
  let deliveryRight = document.getElementById('DeliveryRight');
  let deliverySerial = document.getElementById('DeliverySerial');

  deliveryRight.innerHTML = `<h3>Delivery Address</h3>`;
  deliveryRight.classList.add('disableOption');
  deliverySerial.classList.add('disableOption');
}

function disablePayment() {
  let paymentRight = document.getElementById('PaymentRight');
  let paymentSerial = document.getElementById('PaymentSerial');

  paymentRight.innerHTML = `<h3>Payment</h3>`;
  paymentRight.classList.add('disableOption');
  paymentSerial.classList.add('disableOption');
}

function deliverHere() {
  let deliveryRight = document.getElementById('DeliveryRight');
  let deliverySerial = document.getElementById('DeliverySerial');

  deliverySerial.innerHTML = `<i class="fas fa-check"></i>`;

  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  deliveryRight.innerHTML = `<h3>Delivery Address</h3>
      <div id="FinalDeliveryAddress">
      <strong>${loggedUser.address['addressType']}</strong>
      <p> ${loggedUser.address['houseNo']}</p>
      <p>
        ${loggedUser.address['landmark']}
      </p>
    </div>
  `;

  addPayment();
}

function checkDelivery() {
  let deliveryRight = document.getElementById('DeliveryRight');

  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  if (loggedUser.address) {
    deliveryRight.innerHTML = `<h3>Delivery Address</h3>
      <div class="addresses">
        <div id="addNewAddress">
          <h3>Add New Address</h3>
          <button id="addNew" class="yellowBtn" onclick="addAddress()">Add New</button>
        </div>
        <div class="AddressCard">
          <div class="AddressCardType">
            <h3>Others</h3>
            <p>
              ${loggedUser.address['houseNo']} ${loggedUser.address['landmark']}
            </p>
          </div>
          <button id="addNew" class="yellowBtn" onclick="deliverHere()">Deliver Here</button>
        </div>
      </div>`;
  } else {
    deliveryRight.innerHTML = `<h3>Delivery Address</h3>
    <div class="addresses">
      <div id="addNewAddress">
        <h3>Add New Address</h3>
        <button id="addNew" class="yellowBtn" onclick="addAddress()">Add New</button>
      </div>
    </div>`;
  }
  disablePayment(); // enable payment option
}

function checkAccount() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  if (!loggedUser) {
    let AccountSerial = document.getElementById('AccountSerial');
    AccountSerial.innerHTML = `1`;

    let AccountRight = document.getElementById('Account_right');
    AccountRight.innerHTML = null;
    AccountRight.innerHTML = `<h3>Account</h3>
          <p>To place your order now, log in to your existing account or sign up.</p>
                    <div class="AccountButtons">
                        <button id="login">
                            <span>Have an account</span>
                            Log In
                        </button>
                        <button id="signup">
                            <span>New to Faasos?</span>
                            Sign Up
                        </button>
                    </div> `;

    disableDelivery(); // disable delivery option
    disablePayment(); // enable payment option
  } else {
    let AccountSerial = document.getElementById('AccountSerial');
    AccountSerial.innerHTML = `<i class="fas fa-check"></i>`;

    let AccountRight = document.getElementById('Account_right');
    AccountRight.innerHTML = `<h4 id="userDetails">
       ${loggedUser.name} &nbsp; | &nbsp; ${loggedUser.number}
     </h4>`;

    checkDelivery();
  }
}

checkAccount();

function addAddress() {
  let checkoutMain = document.getElementById('checkoutMain');
  let openMapPopUp = document.createElement('div');
  openMapPopUp.id = 'openMapPopUp';
  openMapPopUp.innerHTML = `
  <div id="popUpMapContainer">
    <div id="popUpMapModal">
      <img src="/images/leftArrow.svg" alt="" id="backButton" />
      <img src="/images/map.PNG" alt="" class="mapImage">
    </div>
    <form>
      <div id="locationDiv">
        <div>
          <img src="/images/location.svg" alt=" ">
          <h3>Gandhi Market Mirdard Road Area</h3>
        </div>
      </div>
      <input type="text" id="houseNo" placeholder="House / Flat no." />
      <input type="text" id="landmark" placeholder="Landmark" />
      <ul class="typeOfAddress">
        <input type="radio" name="addressType" id="home" value="Home" checked>
        <label for="home"> <img src="/images/home.svg" alt=""> Home</label>
        <input type="radio" name="addressType" id="work" value="Work">
        <label for="work"> <img src="/images/work.svg" alt=""> Work</label>
        <input type="radio" name="addressType" id="others" value="Others">
        <label for="others"> <img src="/images/location.svg" alt=""> Others</label>
      </ul>
    </form>
    <button id="saveButton" onclick="addUserAddress()">Save</button>
  </div>`;

  checkoutMain.append(openMapPopUp);
}

async function addUserAddress() {
  let addressType = document.querySelector(`input[type="radio"]:checked`).value;
  let houseNo = document.getElementById(`houseNo`).value;
  let landmark = document.getElementById(`landmark`).value;

  let address = { addressType, houseNo, landmark };

  // let allUsers = JSON.parse(localStorage.getItem('users'));
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  loggedUser.address = address;
  
  const updatedUser = await useAPI(`http://localhost:8080/users/${loggedUser.number}`, {
    method: "PUT",
    body: JSON.stringify(loggedUser),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

  let openMapPopUp = document.getElementById('openMapPopUp');
  openMapPopUp.remove();
  checkDelivery();
}

// Add Payment Area

function addPayment() {
  let paymentRight = document.getElementById('PaymentRight');
  let paymentSerial = document.getElementById('PaymentSerial');

  paymentRight.classList.remove('disableOption');
  paymentSerial.classList.remove('disableOption');

  let totalAmount = JSON.parse(localStorage.getItem('totalCartAmount'));
  let deliveryFees = 97;

  let PaymentRight = document.getElementById('PaymentRight');
  PaymentRight.innerHTML = `<h3>Payment</h3>
  <div id="PaymentDetails">
    <ul id="PaymentOptions">
      <li id="selectGPay" >
          <img
            class="paymentLogo"
            src="/images/paymentLogo.svg"
            alt="" />UPI
      </li>
      <li id="selectCOD" class="activePaymentOption">
        <img
          class="paymentLogo"
          src="/images/paymentLogo.svg"
          alt=""
        />COD
      </li>
    </ul>
    <div id="PaymentMode">
      <div id="COD">
          <div id="CODInfo">
            <img src="https://assets.faasos.io/faasos_v2/COD.svg" alt="">
            <h3>Cash On Delivery</h3>
            <p>Online payment recommended for better hand hygiene</p>
          </div>
          <button id="payButton" onclick="orderFood()">Pay ₹ ${totalAmount + deliveryFees
    }</button>
        </div>
      </div>
  </div>
`;
  chooseOption();
}

function orderSummaryItems() {
  let totalCartAmount = 0;
  let cartList = JSON.parse(localStorage.getItem('cart'));

  if (!cartList || cartList.length <= 0) {
    window.location.href = '../pages/collections.html';
  }

  let displayCartList = document.getElementById('cartList');
  displayCartList.innerHTML = null;

  for (let i = 0; i < cartList.length; i++) {
    displayCartList.append(createCartItem(cartList[i]));
    totalCartAmount += cartList[i].price * cartList[i].quantity;
  }

  let cartTotal = document.getElementById('cartTotal');
  cartTotal.innerHTML = `₹ ${totalCartAmount}`;

  let finalAmount = document.getElementById('finalAmount');
  finalAmount.innerHTML = `₹ ${totalCartAmount + 97}`;

  localStorage.setItem('totalCartAmount', JSON.stringify(totalCartAmount));

  let paymentRight = document.getElementById('PaymentRight');
  if (!paymentRight.classList.contains('disableOption')) {
    addPayment();
  }
}

orderSummaryItems();

// Dummy

function removeCartItem(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart'));
  let newCartItems = [];
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == id && cartItems[i].quantity <= 1) continue;
    else if (cartItems[i].id == id) cartItems[i].quantity--;
    newCartItems.push(cartItems[i]);
  }
  localStorage.setItem('cart', JSON.stringify(newCartItems));
  orderSummaryItems();
}

function addCartItem(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart'));
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == id) cartItems[i].quantity++;
  }
  localStorage.setItem('cart', JSON.stringify(cartItems));
  orderSummaryItems();
}

function createCartItem(food) {
  let li = document.createElement('li');
  li.innerHTML = `
		<div class="cartItem">
		  <div class="cartItemDetails">
			<span class="category"
			  ><img src="/images/${food.veg_nonVeg == 'veg' ? 'vegLogo.svg' : 'nonVegLogo.svg'
    }" alt=""
			/></span>
			<div>
			  <p class="cartItemName">${food.name}</p>
			  <p class="cartItemAddon">
				Mexican Potato Salsa Wrap (Default Option),Mexican
				Potato Salsa Wrap (Default Option),
			  </p>
			</div>
		  </div>
		  <div class="cartItemCount">
			<button id="decrease" onclick="removeCartItem(${food.id})">-</button>
			<span>${food.quantity}</span>
			<button id="increase" onclick="addCartItem(${food.id})">+</button>
		  </div>
		  <div class="cartItemAmount">
			<span>₹ ${food.price * food.quantity}</span>
		  </div>
		</div>
	  `;
  return li;
}

function switchPaymentOption() {
  let PaymentOptions = document.getElementById('PaymentOptions').children;

  let totalCartAmount = JSON.parse(localStorage.getItem('totalCartAmount'));

  for (let i = 0; i < PaymentOptions.length; i++) {
    PaymentOptions[i].classList.remove('activePaymentOption');
  }
  this.classList.add('activePaymentOption');
  let PaymentMode = document.getElementById('PaymentMode');
  if (this.id == 'selectGPay') {
    PaymentMode.innerHTML = `<div id="GPay">
                    <div id="GPayImage">
                      <img
                        src="https://assets.faasos.io/faasos_v2/gpayLogo.png"
                        alt="google pay"
                      />
                      <span><i class="fas fa-check-circle"></i></span>
                    </div>
                    <form>
                      <input type="text" id="gpayNumber" value="9643011147" />
                      <label for="gpayNumber">Phone Number</label>
                    </form>
                    <button id="payButton"  onclick="orderFood()">Pay ₹ ${totalCartAmount + 97
      }</button>
                  </div>`;
  } else if (this.id == 'selectCOD') {
    PaymentMode.innerHTML = `<div id="COD">
    <div id="CODInfo">
      <img src="https://assets.faasos.io/faasos_v2/COD.svg" alt="">
      <h3>Cash On Delivery</h3>
      <p>Online payment recommended for better hand hygiene</p>
    </div>
    <button id="payButton" onclick="orderFood()">Pay ₹ ${totalCartAmount + 97
      }</button>
  </div>`;
  }
}

function chooseOption() {
  let PaymentOptions = document.getElementById('PaymentOptions').children;
  for (let i = 0; i < PaymentOptions.length; i++) {
    PaymentOptions[i].addEventListener('click', switchPaymentOption);
  }
}

async function orderFood() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let currentCart = JSON.parse(localStorage.getItem('cart'));
  if (!loggedUser.orders) {
    loggedUser.orders = [];
  }
  loggedUser.orders = [...currentCart, ...loggedUser.orders];
  // console.log('currentOrder:', loggedUser.orders);



  const updatedUser = await useAPI(`http://localhost:8080/users/${loggedUser.number}`, {
      method: "PUT",
      body: JSON.stringify(loggedUser),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  // let allUsers = JSON.parse(localStorage.getItem('users'));
  // for (let i = 0; i < allUsers.length; i++) {
  //   if (loggedUser.number == allUsers[i].number) {
  //     allUsers[i] = loggedUser;
  //     break;
  //   }
  // }

  // localStorage.setItem('users', JSON.stringify(allUsers));
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  localStorage.setItem('cart', null);

  window.location.href = '/order';
}
