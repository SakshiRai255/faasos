/*-------------------------------------------Login Pop Function-----------------------------------------*/
function popUpLogin() {
  let login = document.getElementById('popUp');
  login.style.display = 'flex';

  let loginPage = document.getElementById('openPopUp');

  login.append(loginPage);
}

var numberInput = document.getElementById('phoneNumber');
var popUp = document.getElementById('alertNumber');
var button = document.getElementById('continueButton');

numberInput.addEventListener('input', function () {
  let numberLength = numberInput.value.length;

  if (numberLength <= 9) {
    popUp.style.display = 'flex';
    numberInput.style.backgroundImage = 'unset';
    button.style.backgroundColor = '#d3d3d6';
  } else if (numberLength == 10) {
    popUp.style.display = 'none';
    numberInput.style.backgroundImage = 'url(../images/greenTick.jpg)';
    button.style.backgroundColor = 'rgb(255, 211, 68)';
  }
});

/*-------------------------------------------SignUp Pop Function-----------------------------------------*/
function popUpSignup() {
  let login = document.getElementById('popUp');
  login.style.display = 'flex';

  let loginPage = document.getElementById('signUpPopUp');

  login.append(loginPage);
}
var numberInputSign = document.getElementById('phoneNumberSign');
var popSignUp = document.getElementById('aNumber');
var buttonSign = document.getElementById('continueButtonSign');

numberInputSign.addEventListener('input', function () {
  let numberLength = numberInputSign.value.length;

  if (numberLength <= 9) {
    popSignUp.style.display = 'flex';
    numberInputSign.style.backgroundImage = 'unset';
    buttonSign.style.backgroundColor = '#d3d3d6';
  } else if (numberLength == 10) {
    popSignUp.style.display = 'none';
    numberInputSign.style.backgroundImage = 'url(../images/greenTick.jpg)';
    buttonSign.style.backgroundColor = 'rgb(255, 211, 68)';
  }
});

function onclickoutside(e) {
  if (e.target.id == 'openPopUp' || e.target.id == 'signUpPopUp') {
    let login = document.getElementById('popUp');
    login.style.display = 'none';
    numberInput.value = null;
    popUp.style.display = 'none';
    numberInput.style.backgroundImage = 'unset';
    button.style.backgroundColor = '#d3d3d6';
  }
}
window.addEventListener('click', onclickoutside);

function goToCollection() {
  let location = document.getElementById('deliveryLocation').value;
  localStorage.setItem('location', JSON.stringify(location));

    window.location.href = '../pages/collections.html';
}

/* -----------------------------------------------Email Checker-------------------------------------------------------*/

var number = '1234567890';
var lower = 'abcdefghijklmnopqrstuvwxyz';
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var special = '_@-.';

function emailCheck(email) {
  var newEmail = email.split('');
  checkMailId(newEmail);
}

function checkMailId(x) {
  var count = 0;
  for (var i = 0; i < x.length; i++) {
    if (x[i] == '@') {
      count += 1;
    }
  }
  checkAtDots(x);
  checkChar(x);
  checkTld(x);
  if (
    count == 0 ||
    count > 1 ||
    count1 == 1 ||
    count1 == 2 ||
    x[0] == '@' ||
    x[0] == '.' ||
    count3 == 0 ||
    count4 == 0
  ) {
    console.log('No');
  } else {
    console.log('Yes');
  }
}

function checkAtDots(x) {
  count1 = 0;
  for (var i = 0; i < x.length; i++) {
    if (x[i] == '@') {
      if (x[i + 1] == '.') {
        count1 += 1;
      }
    }
    if (x[i] == '.') {
      if (x[i + 1] == '.') {
        count1 += 1;
      }
    }
  }
  return count1;
}

function checkChar(x) {
  count3 = 0;
  for (var i = 0; i < x.length; i++) {
    if (
      lower.indexOf(x[i]) === -1 &&
      upper.indexOf(x[i]) === -1 &&
      special.indexOf(x[i]) === -1 &&
      number.indexOf(x[i]) === -1
    ) {
      count3 = 0;
      break;
    } else {
      count3 = 1;
    }
  }
  return count3;
}

function checkTld(x) {
  var a = x.join('');
  var b = a.split('.');
  var tld = b[b.length - 1];
  count4 = 0;
  if (tld.length >= 2 && tld.length <= 3) {
    count4 = 1;
  }
  return count4;
}
