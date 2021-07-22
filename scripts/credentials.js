function findUser(number) {
  let allUsers = JSON.parse(localStorage.getItem('users'));
  if (!allUsers) return null;
  for (let i = 0; i < allUsers.length; i++) {
    console.log(allUsers[i].number);
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
  if (window.location.pathname == '/pages/landingPage.html') {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    let credentialButtons = document.getElementById('credentialButtons');
    if (loggedUser) {
      credentialButtons.innerHTML = `<button id="logout" onclick="logout()">Logout</button>`;
    } else {
      credentialButtons.innerHTML = `<button id="login" onclick="popUpLogin()">Login</button>
      <button id="signUp" onclick="popUpSignup()">Sign Up</button>`;
    }
  }
}

function signIn() {
  let data = document.getElementById('signInForm');
  let allUsers = JSON.parse(localStorage.getItem('users'));

  let number = Number(data.phoneNumber.value);
  let user = findUser(number);
  if (!user) {
    popUp.style.display = 'flex';
    popUp.textContent = `Not a registered user`;

    setTimeout(function () {
      popUp.textContent = `Phone should contain minimum 10 digits`;
      popUp.style.display = 'none';
    }, 2000);
  } else {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    closePopUp();
    isLoggedUser();
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
  allUsers.push(user);

  localStorage.setItem('users', JSON.stringify(allUsers));
  localStorage.setItem('loggedUser', JSON.stringify(user));
  closePopUp();
  isLoggedUser();
}

function logout() {
  localStorage.removeItem('loggedUser');
  isLoggedUser();
}

isLoggedUser();
