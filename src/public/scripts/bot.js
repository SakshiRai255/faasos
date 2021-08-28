var $messages = $('.messages-content');
var serverResponse = "wala";


var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch (e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function (e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  document.getElementById("MSG").value = speechToText;
  //console.log(speechToText)
  insertMessage()
}


function listendom(no) {
  console.log(no)
  //console.log(document.getElementById(no))
  document.getElementById("MSG").value = no.innerHTML;
  insertMessage();
}

$(window).load(function () {
  $messages.mCustomScrollbar();
  setTimeout(function () {
    const user = JSON.parse(localStorage.getItem("loggedUser")).name;
    serverMessage(`Hi ${user}, Welcome to FAASOS, how can I assist you?`);
  }, 100);

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');

  const order_msg = ["orders", "my orders", "show all orders", "show my orders", "my order"];
  const userDetails = ["my details", "my registered mobile number", "mobile number", "my mobile number", "registered number"];
  if (order_msg.indexOf(msg) != -1) {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    fetch(`http://localhost:8080/users/${user.number}`).then(res => {
      serverMessage(`Thanks for your query, we are getting your orders 🍔`)
      return res.json();
    }).then(data => {
      console.log(data)
      if (!data || data.orders.length == 0) {
        serverMessage(`Oops, you haven't ordered anything!`)
      } else {
        setTimeout(() => {
          serverMessage(`Here are your recent orders:`)
          setTimeout(() => {
              data.orders.forEach(item => serverMessage(item.name));
          }, 2500);
        }, 1500);
      }
    });
  } else if (userDetails.indexOf(msg) != -1) {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    fetch(`http://localhost:8080/users/${user.number}`).then(res => res.json()).then(data => {
      serverMessage(`${user.name} your registered mobile number is ${user.number}`);
    });
  } else {
    fetchmsg()
  }

  $('.message-input').val(null);
  updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e) => {
  e.preventDefault()
  insertMessage();
}

function serverMessage(response2) {


  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();


  setTimeout(function () {
    $('.message.loading').remove();
    $('<div class="message new">' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}


function fetchmsg() {

  var url = 'http://localhost:8080/send-msg';

  const data = new URLSearchParams();

  for (const pair of new FormData(document.getElementById("mymsg"))) {
    data.append(pair[0], pair[1]);
    console.log(pair)
  }

  console.log("abc", data)
  fetch(url, {
    method: 'POST',
    body: data
  }).then(res => res.json())
    .then(response => {
      console.log(response);
      serverMessage(response.Reply);
    })
    .catch(error => console.error('Error h:', error));

}


