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

function checkDelivery() {
  let deliveryRight = document.getElementById('DeliveryRight');
  let deliverySerial = document.getElementById('DeliverySerial');

  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  if (!loggedUser.address) {
    deliveryRight.innerHTML = `<div class="addresses">
          <div id="addNewAddress">
            <h3>Add New Address</h3>
            <button id="addNew" class="yellowBtn">Add New</button>
          </div>
          <div class="AddressCard">
            <div class="AddressCardType">
              <h3>Others</h3>
              <p>
                ${loggedUser.address}
              </p>
            </div>
            <button id="addNew" class="yellowBtn">Deliver Here</button>
          </div>
        </div> `;
  }
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
                    
                    checkDelivery();
       
//     disableDelivery(); // disable delivery option
    disablePayment(); // enable payment option
  } else {
    let AccountSerial = document.getElementById('AccountSerial');
    AccountSerial.innerHTML = `<i class="fas fa-check"></i>`;

    let AccountRight = document.getElementById('Account_right');
    AccountRight.innerHTML = `<h4 id="userDetails">
       ${loggedUser.name} &nbsp; | &nbsp; ${loggedUser.number}
     </h4>`;

     // checkDelivery();
}
}

checkAccount();
