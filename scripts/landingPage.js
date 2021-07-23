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

/*-------------------------------------------Verify OTP Pop Function-----------------------------------------*/

function goToVerifyOTP() {
  let phoneNumber = document.getElementById('phoneNumber').value;
  localStorage.setItem('unverifiedNumber', JSON.stringify(phoneNumber));

  let allUsers = JSON.parse(localStorage.getItem('users'));
  
  let number = Number(phoneNumber);
  let user = findUser(number);
  if (!user) {
    popUp.style.display = 'flex';
    popUp.textContent = `Not a registered user`;

    setTimeout(function () {
      popUpSignup();
    }, 2000);
    return;
  }

  let login = document.getElementById('popUp');
  login.style.display = 'flex';

  var getNumber = numberInput.value;
  var appendNumber = document.getElementById('detail');
  appendNumber.innerText = `OTP sent to +91 ${getNumber}`;

  let otp = document.getElementById('otpVeriy');
  if (numberInput.value.length == 10) {
    login.append(otp);
  }
}

var otp = document.getElementById('OTP');
var alertOTP = document.getElementById('alertOTP');
var sendOTP = document.getElementById('sendOTP');
var verfiyButton = document.getElementById('verifyButton');

otp.addEventListener('input', function () {
  let otpLength = otp.value.length;

  if (otpLength < 4) {
    alertOTP.style.display = 'flex';
    sendOTP.style.display = 'none';
    verfiyButton.style.backgroundColor = '#d3d3d6';
    otp.style.backgroundImage = 'unset';
  } else if (otpLength == 4) {
    verfiyButton.style.backgroundColor = 'rgb(255, 211, 68)';
    alertOTP.style.display = 'none';
    sendOTP.style.display = 'none';
    otp.style.backgroundImage = 'url(../images/greenTick.jpg)';
  }
});

function verify() {
  let login = document.getElementById('popUp');
  login.style.display = 'none';

  let phoneNumber = JSON.parse(localStorage.getItem('unverifiedNumber'));
  signIn(phoneNumber);
}

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
  } else if (numberLength == 10) {
    popSignUp.style.display = 'none';
    numberInputSign.style.backgroundImage = 'url(../images/greenTick.jpg)';
  }
});

var userName = document.getElementById('userName');

userName.addEventListener('input', function () {
  if (userName.value.length >= 1) {
    userName.style.backgroundImage = 'url(../images/greenTick.jpg)';
  } else if (userName.value.length === 0) {
    userName.style.backgroundImage = 'unset';
  }
});

var eMail = document.getElementById('email');
var alertEmail = document.getElementById('checkEmail');
var sumbitSignUp = document.getElementById('continueButtonSign');

eMail.addEventListener('input', function () {
  if (emailCheck(email.value) == 'yes') {
    eMail.style.backgroundImage = 'url(../images/greenTick.jpg)';
    alertEmail.style.display = 'none';
  } else {
    eMail.style.backgroundImage = 'unset';
    alertEmail.style.display = 'flex';
  }
  if (
    numberInputSign.value.length >= 9 &&
    userName.value.length >= 1 &&
    emailCheck(email.value) == 'yes'
  ) {
    sumbitSignUp.style.backgroundColor = 'rgb(255, 211, 68)';
  } else {
    sumbitSignUp.style.backgroundColor = '#d3d3d6';
  }
});

function onclickoutside(e) {
  if (
    e.target.id == 'openPopUp' ||
    e.target.id == 'signUpPopUp' ||
    e.target.id == 'otpVeriy'
  ) {
    let login = document.getElementById('popUp');
    login.style.display = 'none';
    numberInput.value = null;
    otp.value = null;
    numberInputSign.value = null;
    popUp.style.display = 'none';
    popSignUp.style.display = 'none';
    numberInput.style.backgroundImage = 'unset';
    numberInputSign.style.backgroundImage = 'unset';
    button.style.backgroundColor = '#d3d3d6';
    userName.value = null;
    userName.style.backgroundImage = 'unset';
    eMail.value = null;
    eMail.style.backgroundImage = 'unset';
    alertEmail.style.display = 'none';
    sumbitSignUp.style.backgroundColor = '#d3d3d6';
  }
  console.log(e.target.id);
}
window.addEventListener('click', onclickoutside);

function goToCollection() {
  
  let locationInput = document.getElementById("locationInput").value;
  localStorage.setItem("location", locationInput);
  window.location.href = '../pages/collections.html';
}

/* -----------------------------------------------Email Checker-------------------------------------------------------*/

var number = '1234567890';
var lower = 'abcdefghijklmnopqrstuvwxyz';
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var special = '_@-.';

function emailCheck(email) {
  var newEmail = email.split('');
  return checkMailId(newEmail);
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
    return 'no';
  } else {
    return 'yes';
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
  if (tld.length >= 2 && tld.length <= 10) {
    count4 = 1;
  }
  return count4;
}


/* ------------------------------------ Enter Input Location ---------------------------- */

function enterInputLocation() {
  let locationInput = document.getElementById("locationInput");
  locationInput.value = `Ghaziabad`;
  locationInput.style.fontWeight = `bold`;
}