function findUser(number) {
  let allUsers = JSON.parse(localStorage.getItem('users'));
  if (!allUsers) return null;
  for (let i = 0; i < allUsers.length; i++) {
    // console.log(allUsers[i].number);
    if (allUsers[i].number == number) return allUsers[i];
  }
  return null;
}

function closePopUp() {
  let login = document.getElementById('popUp');
  login.style.display = 'none';
  numberInput.value = null;
  popUp.style.display = 'none';
  numberInput.style.backgroundImage = 'unset';
  button.style.backgroundColor = '#d3d3d6';
}

function isLoggedUser() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  if (loggedUser) {
    if (window.location.pathname == '/pages/landingPage.html') {
      let credentialButtons = document.getElementById('credentialButtons');
      credentialButtons.innerHTML = `<button id="logout" onclick="logout()">Logout</button>`;
    }
  } else {
    if (window.location.pathname == '/pages/landingPage.html') {
      credentialButtons.innerHTML = `<button id="login" onclick="popUpLogin()">Login</button>
        <button id="signUp" onclick="popUpSignup()">Sign Up</button>`;
    } else {
      window.location.href = '/pages/landingPage.html';
    }
  }
}

function signIn(phoneNumber) {
  localStorage.removeItem('unverifiedNumber');
  let allUsers = JSON.parse(localStorage.getItem('users'));

  let number = Number(phoneNumber);
  let user = findUser(number);
  if (!user) {
    popUp.style.display = 'flex';
    popUp.textContent = `Not a registered user`;

    setTimeout(function () {
      popUpSignup();
    }, 2000);
    return false;
  } else {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    if (user.cart) {
      localStorage.setItem('cart', JSON.stringify(user.cart));
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    closePopUp();
    isLoggedUser();
    return true;
  }
}

function signUp() {
  let data = document.getElementById('signUpForm');

  let user = {
    name: data.userName.value,
    number: data.phoneNumberSign.value,
    email: data.email.value,
  };

  let allUsers = JSON.parse(localStorage.getItem('users'));
  if (!allUsers) {
    allUsers = [];
  }
  if (findUser(user.number)) {
    signIn(user.number);
  } else {
    allUsers.push(user);

    localStorage.setItem('users', JSON.stringify(allUsers));
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('loggedUser', JSON.stringify(user));
    closePopUp();
    isLoggedUser();
  }
}

function logout() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let allUsers = JSON.parse(localStorage.getItem('users'));

  loggedUser.cart = cart;
  for (let i = 0; i < allUsers.length; i++) {
    if (loggedUser.number == allUsers[i].number) {
      allUsers[i] = loggedUser;
      break;
    }
  }

  localStorage.setItem('users', JSON.stringify(allUsers));
  localStorage.removeItem('cart');

  localStorage.removeItem('loggedUser');
  isLoggedUser();
}

isLoggedUser();
