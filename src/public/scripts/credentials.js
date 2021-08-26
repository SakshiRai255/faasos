const useAPI = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

function findUser(number) {
  let allUsers = JSON.parse(localStorage.getItem('users'));
  if (!allUsers) return null;
  for (let i = 0; i < allUsers.length; i++) {
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

  const locationPopUp = document.getElementById("locationPopUp");
  const inputLocation = document.getElementById("inputLocation");
  const appendLocation = document.getElementById("appendLocation");
  inputLocation.value = null;
  appendLocation.innerHTML = `<div>
  <img src="/images/landingLocation.svg" />
  <div>
    <p>Use Current Location</p>
    <span>Accuracy may vary depending on the strength of gps signal of device</span>
  </div>
</div>`;
  locationPopUp.style.display = "none";
}

function isLoggedUser() {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  if (loggedUser) {
    if (window.location.pathname == '/') {
      let credentialButtons = document.getElementById('credentialButtons');
      credentialButtons.innerHTML = `<button id="logout" onclick="logout()">Logout</button>`;
    }
  } else {
    if (window.location.pathname == '/') {
      credentialButtons.innerHTML = `<button id="login" onclick="popUpLogin()">Login</button>
        <button id="signUp" onclick="popUpSignup()">Sign Up</button>`;
    } else {
      if (window.location.pathname != '/') {
        window.location.href = '/';
      }
    }
  }
}

async function signIn(phoneNumber) {
  localStorage.removeItem('unverifiedNumber');

  const number = Number(phoneNumber);
  const user = await useAPI(`http://localhost:8080/users/${number}`);

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

async function signUp() {
  let data = document.getElementById('signUpForm');

  if (
    data.userName.value == '' ||
    data.phoneNumberSign.value.length < 10 ||
    data.email.value == ''
  ) {
    return;
  }

  const user = {
    name: data.userName.value,
    number: data.phoneNumberSign.value,
    email: data.email.value,
  };

  const foundUser = await useAPI(`http://localhost:8080/users/${user.number}`);

  if (foundUser) {
    popUpLogin();
  } else {
    const newUser = await useAPI(`http://localhost:8080/users`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('loggedUser', JSON.stringify(user));
    closePopUp();
    isLoggedUser();
  }
}

async function logout() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  // const allUsers = await useAPI(`http://localhost:8080/users`);

  const number = loggedUser.number;

  // const user = await useAPI(`http://localhost:8080/users/${number}`);

  loggedUser.cart = cart;

  const updatedUser = await useAPI(`http://localhost:8080/users/${loggedUser.number}`, {
    method: "PUT",
    body: JSON.stringify(loggedUser),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  console.log('updatedUser:', updatedUser)

  localStorage.removeItem('cart');
  localStorage.removeItem('loggedUser');

  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    localStorage.removeItem("token")
  }

  // isLoggedUser();
}

isLoggedUser();
