function findUser(number) {
  let allUsers = JSON.parse(localStorage.getItem('users'));
  if (!allUsers) return null;
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers.number == number) return allUsers[i];
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

function signIn() {
  let data = document.getElementById('signInForm');
  let allUsers = JSON.parse(localStorage.getItem('users'));

  let user = findUser(data.phoneNumber.value);
  if (!user) {
    popUp.style.display = 'flex';
    popUp.textContent = `Not a registered user`;

    let phoneNumber = document.getElementById('phoneNumber');

    setTimeout(function () {
      popUp.textContent = `Phone should contain minimum 10 digits`;
      popUp.style.display = 'none';
    }, 2000);
  } else {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    closePopUp();
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
    allUsers = [user];
  } else {
    allUsers.push(user);
  }

  localStorage.setItem('users', JSON.stringify(user));
  localStorage.setItem('loggedUser', JSON.stringify(user));
  closePopUp();
}
