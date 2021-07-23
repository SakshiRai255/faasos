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
  console.log('user:', user);

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
          loggedUser.address['houseNo'] + ', ' + loggedUser.address['landmark'];   
    } else {
        let box2 = document.getElementById("box2");
        box2.style.display = "none";
    }
}
showProfile();

function goToCollections() {
  window.location.href = './collections.html';
}

function addAddress() {
  let body = document.getElementsByTagName('body')[0];
  let openMapPopUp = document.createElement('div');
  openMapPopUp.id = 'openMapPopUp';
  openMapPopUp.innerHTML = `
    <div id="popUpMapContainer">
      <div id="popUpMapModal">
        <img src="../images/leftArrow.svg" alt="" id="backButton" />
        <img src="../images/map.PNG" alt="" class="mapImage">
      </div>
      <form>
        <div id="locationDiv">
          <div>
            <img src="../images/location.svg" alt=" ">
            <h3>Gandhi Market Mirdard Road Area</h3>
          </div>
        </div>
        <input type="text" id="houseNo" placeholder="House / Flat no." />
        <input type="text" id="landmark" placeholder="Landmark" />
        <ul class="typeOfAddress">
          <input type="radio" name="addressType" id="home" value="Home" checked>
          <label for="home"> <img src="../images/home.svg" alt=""> Home</label>
          <input type="radio" name="addressType" id="work" value="Work">
          <label for="work"> <img src="../images/work.svg" alt=""> Work</label>
          <input type="radio" name="addressType" id="others" value="Others">
          <label for="others"> <img src="../images/location.svg" alt=""> Others</label>
        </ul>
      </form>
      <button id="saveButton" onclick="addUserAddress()">Save</button>
    </div>`;

  body.append(openMapPopUp);
}

function addUserAddress() {
  let addressType = document.querySelector(`input[type="radio"]:checked`).value;
  let houseNo = document.getElementById(`houseNo`).value;
  let landmark = document.getElementById(`landmark`).value;

  let address = { addressType, houseNo, landmark };

  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let allUsers = JSON.parse(localStorage.getItem('users'));
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].number == loggedUser.number) {
      allUsers[i].address = address;
      loggedUser = allUsers[i];
      break;
    }
  }

  localStorage.setItem('users', JSON.stringify(allUsers));
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

  let openMapPopUp = document.getElementById('openMapPopUp');
  openMapPopUp.remove();
  showAddresses();
}

function deleteAddress() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  delete loggedUser.address;

  let allUsers = JSON.parse(localStorage.getItem('users'));
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].number == loggedUser.number) {
      allUsers[i] = loggedUser;
      break;
    }
  }

  localStorage.setItem('users', JSON.stringify(allUsers));
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

  showAddresses();

}
