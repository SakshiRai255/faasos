var bar1 = document.getElementById('bar1');
var bar2 = document.getElementById('bar2');
var bar3 = document.getElementById('bar3');
var bar4 = document.getElementById('bar4');
var nameNav = document.getElementById('theName').innerText;

function showProfile() {
  document.getElementById('profile').style.display = 'block';
  document.getElementById('order').style.display = 'none';
  document.getElementById('payment').style.display = 'none';
  document.getElementById('address').style.display = 'none';

  let user = JSON.parse(localStorage.getItem('loggedUser'));
  // console.log('user:', user);

  let name = document.getElementById('theName');
  name.innerText = user.name;
  document.getElementById('name').innerText = user.name;

  let number = document.getElementById('theNumber');
  number.innerText = user.number;
  document.getElementById('number').innerText = user.number;

  let email = document.getElementById('theEmail');
  email.innerText = user.email;
  document.getElementById('email').innerText = user.email;

  bar1.style.color = 'rgb(86, 64, 153)';
  bar1.style.borderBottom = '2px solid rgb(86, 64, 153)';
  bar2.style.color = 'rgb(126, 126, 126)';
  bar2.style.borderBottom = '1px solid rgb(126, 126, 126)';
  bar3.style.color = 'rgb(126, 126, 126)';
  bar3.style.borderBottom = '1px solid rgb(126, 126, 126)';
  bar4.style.color = 'rgb(126, 126, 126)';
  bar4.style.borderBottom = '1px solid rgb(126, 126, 126)';
  //  appendBarHere.append(profile);
}

function showOrders() {
  document.getElementById('profile').style.display = 'none';
  document.getElementById('order').style.display = 'flex';
  document.getElementById('payment').style.display = 'none';
  document.getElementById('address').style.display = 'none';

  bar2.style.color = 'rgb(86, 64, 153)';
  bar2.style.borderBottom = '2px solid rgb(86, 64, 153)';
  bar1.style.color = 'rgb(126, 126, 126)';
  bar1.style.borderBottom = '1px solid rgb(126, 126, 126)';
  bar3.style.color = 'rgb(126, 126, 126)';
  bar3.style.borderBottom = '1px solid rgb(126, 126, 126)';
  bar4.style.color = 'rgb(126, 126, 126)';
  bar4.style.borderBottom = '1px solid rgb(126, 126, 126)';
}

function showPayments() {
  document.getElementById('profile').style.display = 'none';
  document.getElementById('order').style.display = 'none';
  document.getElementById('payment').style.display = 'flex';
  document.getElementById('address').style.display = 'none';

  bar3.style.color = 'rgb(86, 64, 153)';
  bar3.style.borderBottom = '2px solid rgb(86, 64, 153)';
  bar2.style.color = 'rgb(126, 126, 126)';
  bar2.style.borderBottom = '1px solid rgb(126, 126, 126)';
  bar1.style.color = 'rgb(126, 126, 126)';
  bar1.style.borderBottom = '1px solid rgb(126, 126, 126)';
  bar4.style.color = 'rgb(126, 126, 126)';
  bar4.style.borderBottom = '1px solid rgb(126, 126, 126)';
}

function showAddresses() {
  document.getElementById('profile').style.display = 'none';
  document.getElementById('order').style.display = 'none';
  document.getElementById('payment').style.display = 'none';
  document.getElementById('address').style.display = 'block';

  bar4.style.color = 'rgb(86, 64, 153)';
  bar4.style.borderBottom = '2px solid rgb(86, 64, 153)';
  bar2.style.color = 'rgb(126, 126, 126)';
  bar2.style.borderBottom = '1px solid rgb(126, 126, 126)';
  bar3.style.color = 'rgb(126, 126, 126)';
  bar3.style.borderBottom = '1px solid rgb(126, 126, 126)';
  bar1.style.color = 'rgb(126, 126, 126)';
  bar1.style.borderBottom = '1px solid rgb(126, 126, 126)';

  let addressType = document.getElementById('addressType');
  let addAddress = document.getElementById('addAddress');

  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  if (loggedUser.address) {
    let box2 = document.getElementById("box2");
    box2.style.display = "block";
    addressType.innerText = loggedUser.address['addressType'];
    addAddress.innerText =
      loggedUser.address['landmark'] + ', ' + loggedUser.address['houseNo'];
  } else {
    let box2 = document.getElementById("box2");
    box2.style.display = "none";
  }
}
showProfile();

function goToCollections() {
  window.location.href = './collections';
}


var timerId;

function throttleFunction() {

  if (timerId) {
    return false;
  }
  timerId = setTimeout(() => {
    getImage()
    timerId = undefined;
  }, 1000);

}

function getImage() {
  let search = document.getElementById('houseNo').value;
  let img = document.getElementById("locationImg");

  if (search.length <= 3) {
    img.src = "https://open.mapquestapi.com/staticmap/v4/getplacemap?key=IdCSOwo0NruqgLsBiqBI41KizoT0nx8G&location=India&size=600,400&zoom=5&showicon=red_1-1";
    document.getElementById("name").innerText = " India";
    return false;
  }


  img.src = `https://open.mapquestapi.com/staticmap/v4/getplacemap?key=IdCSOwo0NruqgLsBiqBI41KizoT0nx8G&location=${search}&size=600,400&zoom=12&showicon=red_1-1`

  document.getElementById("name").innerText = search;

}

const removeAddressPopUp = () => {
  const popUp = document.getElementById("openMapPopUp");
  popUp.style.display = "none";

  const houseNo = document.getElementById("houseNo");
  const landmark = document.getElementById("landmark");

  houseNo.style.display = "none";
  landmark.style.display = "none";

  popUp.remove();
}

function addAddress() {
  let body = document.getElementsByTagName('body')[0];
  let openMapPopUp = document.createElement('div');
  openMapPopUp.id = 'openMapPopUp';
  openMapPopUp.innerHTML = `
  <div id="popUpMapContainer">
  <div id="popUpMapModal">
    <img src="/images/leftArrow.svg" alt="" id="backButton" onclick="removeAddressPopUp()" />
    <img src="https://open.mapquestapi.com/staticmap/v4/getplacemap?key=IdCSOwo0NruqgLsBiqBI41KizoT0nx8G&location=India&size=600,400&zoom=5&showicon=red_1-1" id="locationImg" alt="" class="mapImage">
  </div>
  <form>
    <div id="locationDiv">
      <div>
        <img src="/images/location.svg" alt=" ">
        <h3 id="name"> India</h3>
      </div>
    </div>
    <input type="text" oninput="throttleFunction()" id="houseNo" placeholder="City Name" />
    <input type="text" id="landmark" placeholder="House / Flat no." />
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

  body.append(openMapPopUp);
}

async function addUserAddress() {
  let addressType = document.querySelector(`input[type="radio"]:checked`).value;
  let houseNo = document.getElementById(`houseNo`).value;
  let landmark = document.getElementById(`landmark`).value;

  let address = { addressType, houseNo, landmark };

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
  showAddresses();
}

async function deleteAddress() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  delete loggedUser.address;

  const updatedUser = await useAPI(`http://localhost:8080/users/${loggedUser.number}`, {
    method: "PUT",
    body: JSON.stringify(loggedUser),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

  showAddresses();

}


const windowUrl = window.location.href;
const search = windowUrl.split("?");
if (search.length > 1) {
  const toArea = search[1];
  if (toArea == "address") showAddresses();
  else if (toArea == "payment") showPayments();
  else if (toArea == "orders") showOrders();
}

